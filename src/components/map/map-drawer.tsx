"use client";

import { MapLayerList } from "@/components/map/map-layer-list";
import { cn } from "@/lib/utils";
import { LayersIcon, XIcon } from "lucide-react";
import { useState } from "react";

export const MapDrawer = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => setOpen((state) => !state);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 z-10 p-6 transition-[right] duration-200 ease-in-out",
          open ? "right-[var(--container-xs)]" : "right-0"
        )}
      >
        <button
          className="rounded-md border bg-white p-2 shadow"
          onClick={handleToggle}
        >
          <LayersIcon />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-10 flex w-full max-w-xs flex-col border-l bg-white shadow transition duration-200 ease-in-out",
          { "translate-x-full": !open }
        )}
      >
        <div className="flex items-center justify-between border-b px-3 py-2">
          <div className="font-medium">Map layers</div>
          <button
            className="hover:bg-muted rounded-md p-1"
            onClick={handleToggle}
          >
            <XIcon className="text-muted-foreground size-5" />
          </button>
        </div>

        <MapLayerList />
      </div>
    </>
  );
};
