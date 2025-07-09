import { MapFilter } from "@/context/map-filter";
import { getSelectedPolygonStyles, MAP_LAYER_IDS } from "@/lib/map/styles";
import { Parcel } from "@/types/common";
import { Layer, Source } from "react-map-gl/maplibre";

export const MapPolygons = (props: { mapFilter: MapFilter }) => {
  return (
    <>
      {props.mapFilter.selected && (
        <SelectedPolygon parcel={props.mapFilter.selected} />
      )}
    </>
  );
};

const SelectedPolygon = (props: { beforeId?: string; parcel: Parcel }) => {
  const styles = getSelectedPolygonStyles(props.parcel);

  if (!styles) return null;

  return (
    <Source {...styles.source}>
      <Layer beforeId={props.beforeId} {...styles.lineLayer} />
      <Layer
        beforeId={MAP_LAYER_IDS["selected-parcel"]["layer-line"]}
        {...styles.fillLayer}
      />
    </Source>
  );
};
