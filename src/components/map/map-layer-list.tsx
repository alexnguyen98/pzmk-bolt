import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { initialMapFilterState, useMapFilter } from "@/context/map-filter";
import { BaseLayer, LayerType, OverlayLayer } from "@/lib/map/config";
import {
  BASE_LAYER_LIST,
  LayerListItem,
  OVERLAY_LAYER_LIST,
} from "@/lib/map/layer-list";
import { FilterIcon, SearchIcon, TextSearchIcon } from "lucide-react";
import { useState } from "react";

const filterLayers = (search: string) => {
  const lowerSearch = search.toLowerCase();

  const filteredBase = {
    ...BASE_LAYER_LIST,
    items: BASE_LAYER_LIST.items.filter((item) =>
      item.title.toLowerCase().includes(lowerSearch)
    ),
  };

  const filteredOverlay = {
    ...OVERLAY_LAYER_LIST,
    items: OVERLAY_LAYER_LIST.items.filter((item) =>
      item.title.toLowerCase().includes(lowerSearch)
    ),
  };

  const isEmpty =
    filteredBase.items.length === 0 && filteredOverlay.items.length === 0;

  return { filteredBase, filteredOverlay, isEmpty };
};

export const MapLayerList = () => {
  const [search, setSearch] = useState("");
  const { mapFilter, setMapFilter } = useMapFilter();

  const { filteredBase, filteredOverlay, isEmpty } = filterLayers(search);

  const checkedOverlays = Object.keys(mapFilter.overlays).filter(
    (key) => mapFilter.overlays[key as OverlayLayer]
  ) as OverlayLayer[];

  const handleBase = (e: boolean, layer: LayerType) => {
    if (e) return;
    setMapFilter((state) => ({
      ...state,
      base: layer as BaseLayer,
    }));
  };

  const handleOverlay = (e: boolean, layer: LayerType) => {
    setMapFilter((state) => ({
      ...state,
      overlays: {
        ...state.overlays,
        [layer as OverlayLayer]: !e,
      },
    }));
  };

  return (
    <>
      <div className="p-3 pb-0">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-0 left-0 m-2.5 h-4 w-4" />
          <Input
            className="pl-8"
            placeholder="Search for map layers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Accordion type="multiple" className="flex-1 overflow-y-scroll p-2">
        {isEmpty && <EmptySearchResult />}
        <LayerAccordionItem
          layer={filteredBase}
          checked={[mapFilter.base]}
          onCheck={handleBase}
        />
        <LayerAccordionItem
          layer={filteredOverlay}
          checked={checkedOverlays}
          onCheck={handleOverlay}
        />
      </Accordion>

      <div className="border-t p-3">
        <Button
          className="w-full"
          onClick={() => setMapFilter(initialMapFilterState)}
        >
          <FilterIcon />
          Reset filter
        </Button>
      </div>
    </>
  );
};

const EmptySearchResult = () => (
  <div className="text-muted-foreground mt-5 flex flex-col items-center gap-3 text-center text-sm">
    <div className="bg-muted rounded-md p-2">
      <TextSearchIcon size={30} />
    </div>
    Couldnt find any layers.
  </div>
);

const LayerAccordionItem = (props: {
  layer: LayerListItem;
  checked: LayerType[];
  onCheck: (e: boolean, layer: LayerType) => void;
}) => {
  if (props.layer.items.length === 0) return null;

  return (
    <AccordionItem value={props.layer.title} className="border-none">
      <AccordionTrigger className="hover:bg-muted p-2 hover:no-underline">
        <div className="flex items-center gap-2">
          <div>{props.layer.icon}</div>
          <div className="font-medium">{props.layer.title}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-1">
        {props.layer.items.map((i, index) => {
          const checked = props.checked.includes(i.type);

          return (
            <div
              key={index}
              className="hover:bg-muted flex items-center gap-2 rounded-sm px-2 py-1"
            >
              <Checkbox
                className="border-gray-300 bg-white"
                checked={checked}
                onClick={() => props.onCheck(checked, i.type)}
              />
              {i.description ? (
                <Tooltip>
                  <TooltipTrigger className="cursor-help border-b border-dashed border-gray-300">
                    {i.title}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{i.description}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                i.title
              )}
            </div>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
