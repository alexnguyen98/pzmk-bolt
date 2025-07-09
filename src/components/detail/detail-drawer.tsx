"use client";

import { DetailContent } from "@/components/detail/detail-content";
import { useMapFilter } from "@/context/map-filter";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

export const DetailDrawer = () => {
  const { mapFilter, setMapFilter } = useMapFilter();

  const handleClose = () => {
    setMapFilter((state) => ({ ...state, selected: null }));
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex w-full max-w-md flex-col border-l bg-white shadow transition duration-200 ease-in-out",
        { "-translate-x-full": !mapFilter.selected }
      )}
    >
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="font-medium">Parcel detail</div>
        <button className="hover:bg-muted rounded-md p-1" onClick={handleClose}>
          <XIcon className="text-muted-foreground size-5" />
        </button>
      </div>

      {mapFilter.selected && <DetailContent parcel={mapFilter.selected} />}
    </div>
  );
};
