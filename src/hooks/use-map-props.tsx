import { MapFilter, useMapFilter } from "@/context/map-filter";
import { MapInitConfig } from "@/lib/map/config";
import { BASE_MAP_STYLES } from "@/lib/map/styles";
import { getParcelByLngLat } from "@/lib/third-parties";
import { ErrorEvent, MapLayerMouseEvent } from "maplibre-gl";
import { usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { MapProps, ViewStateChangeEvent } from "react-map-gl/maplibre";

export const useMapProps = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { mapFilter, setMapFilter } = useMapFilter();

  const mapStyle = BASE_MAP_STYLES[mapFilter.base];

  const getCoordinates = () => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const zoom = searchParams.get("zoom");

    if (!lat || !lng || !zoom) return {};

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      zoom: parseFloat(zoom),
    };
  };

  const handleError = (error: ErrorEvent) => {
    console.error("Map error:", error);
    toast.error("An error occurred while loading the map.");
  };

  const handleMoveEnd = (e: ViewStateChangeEvent) => {
    const { longitude, latitude, zoom } = e.viewState;

    const params = new URLSearchParams(searchParams.toString());
    params.set("lat", latitude.toFixed(6));
    params.set("lng", longitude.toFixed(6));
    params.set("zoom", zoom.toFixed(2));

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  const handleClick = async (e: MapLayerMouseEvent) => {
    try {
      const parcel = await getParcelByLngLat(e.lngLat);
      setMapFilter((state) => ({ ...state, selected: parcel }));
    } catch (error) {
      toast.error("An error occured when clicking.");
    }
  };

  return {
    initialViewState: {
      ...MapInitConfig,
      ...getCoordinates(),
    },
    style: {
      width: "100vw",
      height: "100vh",
    },
    onError: handleError,
    onMoveEnd: handleMoveEnd,
    onClick: handleClick,
    mapStyle,
    mapFilter,
  } satisfies MapProps & {
    mapFilter: MapFilter;
  };
};
