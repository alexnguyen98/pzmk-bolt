"use client";

import { MapFilterProvider } from "@/context/map-filter";
import { FC, PropsWithChildren, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { MapProvider } from "react-map-gl/maplibre";

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <Suspense>
    <MapProvider>
      <MapFilterProvider>
        <Toaster position="top-center" />
        {children}
      </MapFilterProvider>
    </MapProvider>
  </Suspense>
);
