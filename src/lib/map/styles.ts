import { BaseLayer, OverlayLayer } from "@/lib/map/config";
import { Parcel } from "@/types/common";
import {
  LayerSpecification,
  SourceSpecification,
  StyleSpecification,
} from "maplibre-gl";

export const CADASTRE_MAX_ZOOM = 14.5;
export const DEFAULT_PARCELS_SELECTION_COLOR = "#7F56D9";

export const MAP_LAYER_IDS = {
  default: {
    source: "default-source",
    layer: "default-layer",
  },
  orto: {
    source: "orto-source",
    layer: "orto-layer",
  },
  "orto-high": {
    source: "orto-high-source",
    layer: "orto-high-layer",
  },
  contour: {
    source: "contour-source",
    layer: "contour-layer",
  },
  "cadastre-white": {
    source: "cadastre-white-source",
    layer: "cadastre-white-layer",
  },
  "cadastre-black": {
    source: "cadastre-black-source",
    layer: "cadastre-black-layer",
  },
  "selected-parcel": {
    source: "selected-parcel-source",
    "layer-fill": "selected-parcel-layer-fill",
    "layer-line": "selected-parcel-layer-line",
  },
};

export const BASE_MAP_STYLES: { [key in BaseLayer]: StyleSpecification } = {
  default: {
    version: 8,
    sources: {
      [MAP_LAYER_IDS.default.source]: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: `<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`,
      },
    },
    layers: [
      {
        id: MAP_LAYER_IDS.default.layer,
        source: MAP_LAYER_IDS.default.source,
        type: "raster",
      },
    ],
    glyphs: `/fonts/{fontstack}/{range}.pbf`,
  },
  orto: {
    version: 8,
    sources: {
      [MAP_LAYER_IDS.orto.source]: {
        type: "raster",
        tiles: [
          "https://ags.cuzk.gov.cz/arcgis1/rest/services/ORTOFOTO_WM/MapServer/WMTS?service=WMTS&request=GetTile&version=1.0.0&layer=ORTOFOTO_WM&style=default&format=image/jpgpng&TileMatrixSet=default028mm&TileMatrix={z}&TileRow={y}&TileCol={x}",
        ],
        tileSize: 256,
        attribution: `<a href="https://cuzk.gov.cz/" target="_blank">ČÚZK - Státní správa zeměměřictví a katastru</a>`,
      },
    },
    layers: [
      {
        id: MAP_LAYER_IDS.orto.layer,
        source: MAP_LAYER_IDS.orto.source,
        type: "raster",
      },
    ],
    glyphs: `/fonts/{fontstack}/{range}.pbf`,
  },
  "orto-high": {
    version: 8,
    sources: {
      [MAP_LAYER_IDS["orto-high"].source]: {
        type: "raster",
        tiles: [
          "https://ags.cuzk.gov.cz/arcgis1/services/ORTOFOTO/MapServer/WMSServer?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image/png&STYLES=&TRANSPARENT=true&LAYERS=0&blankTile=false&CRS=EPSG:3857&WIDTH=512&HEIGHT=512&BBOX={bbox-epsg-3857}",
        ],
        tileSize: 256,
        attribution: `<a href="https://cuzk.gov.cz/" target="_blank">ČÚZK - Státní správa zeměměřictví a katastru</a>`,
      },
    },
    layers: [
      {
        id: MAP_LAYER_IDS["orto-high"].layer,
        source: MAP_LAYER_IDS["orto-high"].source,
        type: "raster",
      },
    ],
    glyphs: `/fonts/{fontstack}/{range}.pbf`,
  },
  contour: {
    version: 8,
    sources: {
      [MAP_LAYER_IDS.contour.source]: {
        type: "raster",
        tiles: [
          "https://ags.cuzk.gov.cz/arcgis1/rest/services/ZTM_WM/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: `<a href="https://cuzk.gov.cz/" target="_blank">ČÚZK - Státní správa zeměměřictví a katastru</a>`,
      },
    },
    layers: [
      {
        id: MAP_LAYER_IDS.contour.layer,
        source: MAP_LAYER_IDS.contour.source,
        type: "raster",
        minzoom: 0,
      },
    ],
    glyphs: `/fonts/{fontstack}/{range}.pbf`,
  },
};

export type ThemedOverlayLayer =
  | Exclude<OverlayLayer, "cadastre">
  | "cadastre-white"
  | "cadastre-black";

export const OVERLAY_MAP_STYLES: {
  [key in ThemedOverlayLayer]: {
    source: SourceSpecification & { id: string };
    layer: LayerSpecification & { id: string };
  };
} = {
  "cadastre-white": {
    source: {
      id: MAP_LAYER_IDS["cadastre-white"].source,
      type: "raster",
      tiles: [
        "https://services.cuzk.gov.cz/wms/wms.asp?service=WMS&request=GetMap&layers=prehledky%2CKN_I&styles=&format=image%2Fpng&transparent=true&version=1.3.0&width=512&height=512&crs=EPSG%3A3857&bbox={bbox-epsg-3857}",
      ],
      tileSize: 256,
      minzoom: CADASTRE_MAX_ZOOM,
    },
    layer: {
      id: MAP_LAYER_IDS["cadastre-white"].layer,
      source: MAP_LAYER_IDS["cadastre-white"].source,
      type: "raster",
      minzoom: CADASTRE_MAX_ZOOM,
    },
  },
  "cadastre-black": {
    source: {
      id: MAP_LAYER_IDS["cadastre-black"].source,
      type: "raster",
      tiles: [
        "https://services.cuzk.gov.cz/wms/wms.asp?service=WMS&request=GetMap&layers=prehledky%2CKN&styles=&format=image%2Fpng&transparent=true&version=1.3.0&width=512&height=512&crs=EPSG%3A3857&bbox={bbox-epsg-3857}",
      ],
      tileSize: 256,
      minzoom: CADASTRE_MAX_ZOOM,
    },
    layer: {
      id: MAP_LAYER_IDS["cadastre-black"].layer,
      source: MAP_LAYER_IDS["cadastre-black"].source,
      type: "raster",
      minzoom: CADASTRE_MAX_ZOOM,
    },
  },
};

export const getSelectedPolygonStyles = (
  parcel: Parcel
): {
  source: SourceSpecification & { id: string };
  fillLayer: LayerSpecification & { id: string };
  lineLayer: LayerSpecification & { id: string };
} | null => {
  if (!parcel.polygon) return null;

  return {
    source: {
      id: MAP_LAYER_IDS["selected-parcel"].source,
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: parcel.polygon.coordinates,
            },
            properties: {},
          },
        ],
      },
    },
    fillLayer: {
      id: MAP_LAYER_IDS["selected-parcel"]["layer-fill"],
      source: MAP_LAYER_IDS["selected-parcel"].source,
      type: "fill",
      layout: {},
      paint: {
        "fill-color": DEFAULT_PARCELS_SELECTION_COLOR,
        "fill-opacity": 0.35,
      },
    },
    lineLayer: {
      id: MAP_LAYER_IDS["selected-parcel"]["layer-line"],
      source: MAP_LAYER_IDS["selected-parcel"].source,
      type: "line",
      layout: {},
      paint: {
        "line-color": DEFAULT_PARCELS_SELECTION_COLOR,
        "line-width": 2,
        "line-opacity": 1,
        "line-offset": 1,
      },
    },
  };
};
