import { MapFilter } from "@/context/map-filter";
import { BaseLayer, OverlayLayer } from "@/lib/map/config";
import { OVERLAY_MAP_STYLES } from "@/lib/map/styles";
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
  ];

  const filtered = overlayConfigs.filter((i) => props.mapFilter.overlays[i.id]);

  return filtered.map((i) => {
    const Component = i.component;
    return <Component key={i.layerId} {...i.props} />;
  });
};

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
