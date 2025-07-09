import { BaseLayer, OverlayLayer } from "@/lib/map/config";
import { Parcel } from "@/types/common";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type MapFilter = {
  base: BaseLayer;
  overlays: { [key in OverlayLayer]?: boolean };
  selected: Parcel | null;
};

type State = {
  mapFilter: MapFilter;
  setMapFilter: Dispatch<SetStateAction<MapFilter>>;
};

export const initialMapFilterState: MapFilter = {
  base: "default",
  overlays: {},
  selected: null,
};

const Context = createContext<State>({
  mapFilter: initialMapFilterState,
  setMapFilter: () => {},
});

export const MapFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mapFilter, setMapFilter] = useState<MapFilter>(initialMapFilterState);

  return (
    <Context.Provider
      value={{
        mapFilter,
        setMapFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMapFilter = (): State => {
  const context = useContext(Context);

  if (!context)
    throw new Error("useMapFilter must be used within a MapFilterProvider");

  return context;
};
