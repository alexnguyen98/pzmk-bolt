import { MapFilter } from "@/context/map-filter";
import { BaseLayer, OverlayLayer } from "@/lib/map/config";
import { MAP_LAYER_IDS, OVERLAY_MAP_STYLES } from "@/lib/map/styles";
import { JSX, ReactNode } from "react";
import { Layer, Source } from "react-map-gl/maplibre";

const blackBase: BaseLayer[] = ["default", "contour"];

export const MapOverlays = (props: { mapFilter: MapFilter }) => {
  const cadastreStyle = blackBase.includes(props.mapFilter.base)
    ? "cadastre-black"
    : "cadastre-white";

  const overlayConfigs: {
    id: OverlayLayer;
    component: JSX.ElementType;
    props?: Record<string, ReactNode>;
    layerId: string;
  }[] = [
    {
      id: "cadastre",
      component: CadastreOverlay,
      props: { style: cadastreStyle },
      layerId: OVERLAY_MAP_STYLES[cadastreStyle].layer.id,
    },
    {
      id: "state-owned",
      component: StateOwnedOverlay,
      layerId: OVERLAY_MAP_STYLES["state-owned"].layer.id,
    },
  ];

  const filtered = overlayConfigs.filter((i) => props.mapFilter.overlays[i.id]);

  return filtered.map((i, index) => {
    const Component = i.component;
    const isLast = index === filtered.length - 1;
    const hasParcel = props.mapFilter.selected !== null;
    const beforeId =
      isLast && hasParcel
        ? MAP_LAYER_IDS["selected-parcel"]["layer-fill"]
        : filtered[index - 1]?.layerId;

    return <Component key={i.layerId} beforeId={beforeId} {...i.props} />;
  });
};

const StateOwnedOverlay = (props: { beforeId?: string }) => (
  <Source {...OVERLAY_MAP_STYLES["state-owned"].source}>
    <Layer
      beforeId={props.beforeId}
      {...OVERLAY_MAP_STYLES["state-owned"].layer}
    />
  </Source>
);

const CadastreOverlay = (props: {
  style: "cadastre-black" | "cadastre-white";
  beforeId?: string;
}) => (
  <Source {...OVERLAY_MAP_STYLES[props.style].source}>
    <Layer
      beforeId={props.beforeId}
      {...OVERLAY_MAP_STYLES[props.style].layer}
    />
  </Source>
);
