export type BaseLayer = "default" | "orto" | "orto-high" | "contour";

export type OverlayLayer = "cadastre";

export type LayerType = BaseLayer | OverlayLayer;

export const MapInitConfig = {
  zoom: 7,
  latitude: 49.8175,
  longitude: 15.473,
  maxZoom: 18,
  minZoom: 6.8,
  attributionControl: false,
};
