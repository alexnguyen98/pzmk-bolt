"use client";

import { MapOverlays } from "@/components/map/map-overlays";
import { MapPolygons } from "@/components/map/map-polygons";
import { useMapProps } from "@/hooks/use-map-props";
import Map, { AttributionControl } from "react-map-gl/maplibre";

export const MapView = () => {
  const { mapFilter, ...mapProps } = useMapProps();

  return (
    <Map {...mapProps}>
      <AttributionControl compact position="bottom-left" />
      <MapOverlays mapFilter={mapFilter} />
      <MapPolygons mapFilter={mapFilter} />
    </Map>
  );
};
