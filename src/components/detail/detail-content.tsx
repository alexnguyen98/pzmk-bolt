import { formatNumber } from "@/lib/utils";
import { Parcel } from "@/types/common";
import { ExternalLinkIcon, LandPlotIcon } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ReactNode } from "react";

export const DetailContent = (props: { parcel: Parcel }) => {
  return (
    <div>
      <div className="flex items-center gap-2 border-b p-3">
        <div className="rounded-md bg-violet-500 p-1">
          <LandPlotIcon size={18} color="white" />
        </div>
        <div className="font-medium">
          {props.parcel.zoning} {props.parcel.numerageType === 1 ? "st. " : ""}
          {props.parcel.landNumber}
        </div>
      </div>

      <div className="p-3">
        <Item icon="proportions" title="Whole area">
          {formatNumber(props.parcel.area ?? 0, 0)} m<sup>2</sup>
        </Item>
        <Item icon="circle-user" title="Owner">
          <a
            className="inline-flex items-center gap-1 rounded-md border border-sky-200 px-1 text-sky-500"
            title="Zobrazit vlastníka na stránkách ČÚZK"
            rel="noopener noreferrer"
            target="_blank"
            href={`https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?typ=parcela&id=${props.parcel.localId}`}
          >
            Show owner
            <ExternalLinkIcon size={16} />
          </a>
        </Item>
        <Item icon="hash" title="Parcel number">
          {props.parcel.localId}
        </Item>
        <Item icon="hash" title="Cadaste area number">
          {props.parcel.cadastralId}
        </Item>
      </div>
    </div>
  );
};

const Item = (props: {
  title: string;
  icon: IconName;
  children: ReactNode;
}) => (
  <div className="grid grid-cols-2 items-center gap-2 py-[6px] text-sm">
    <div className="flex items-center gap-2">
      <DynamicIcon name={props.icon} size={18} color="#62748e" />
      <div className="text-muted-foreground">{props.title}</div>
    </div>
    <div className="font-medium">{props.children}</div>
  </div>
);
