import { LayerType } from "@/lib/map/config";
import { MapIcon, MountainSnowIcon } from "lucide-react";
import { ReactNode } from "react";

export type LayerListItem = {
  icon: ReactNode;
  title: string;
  items: {
    type: LayerType;
    title: string;
    description?: string;
  }[];
};

export const BASE_LAYER_LIST: LayerListItem = {
  icon: <MountainSnowIcon size={20} />,
  title: "Base layers",
  items: [
    { type: "default", title: "Zakladni" },
    { type: "orto", title: "Orto" },
    {
      type: "orto-high",
      title: "Orto highres",
      description: "Vysoké rozlišení ortofoto",
    },
    { type: "contour", title: "Vrstevnice" },
  ],
};

export const OVERLAY_LAYER_LIST: LayerListItem = {
  icon: <MapIcon size={20} />,
  title: "Overlays",
  items: [
    { type: "cadastre", title: "Katastralni vrstva" },
    {
      type: "state-owned",
      title: "Majetek státu",
      description: "Pozemky a budovy vlastněné státními institucemi",
    },
  ],
};
