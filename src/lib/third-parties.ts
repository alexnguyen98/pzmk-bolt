import { cleanupArray, jsonParse } from "@/lib/utils";
import { Parcel } from "@/types/common";
import { CUZK_CadastralParcel } from "@/types/cuzk";
import { LngLat } from "maplibre-gl";
import { xml2json } from "xml-js";

const getParsedXmlData = async <T>(res: Response) => {
  try {
    const text = await res.clone().text();
    if (!text) return null;

    const json: string = xml2json(text, {
      compact: true,
      spaces: 4,
    }) as unknown as string;
    const parsed: unknown = jsonParse(json);

    return parsed as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const parsePolygonData = (
  data: CUZK_CadastralParcel["cp:CadastralParcel"]["cp:geometry"]["gml:Polygon"]
) => {
  if (!data) {
    return null;
  }

  // Parcel outer bounds
  const outerPolygon = data["gml:exterior"]["gml:LinearRing"][
    "gml:posList"
  ]._text
    .split(" ")
    .map((pos) => +pos)
    .reduce((result: number[][], _: number, index: number, array: number[]) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2).reverse());
      }
      return result;
    }, []);

  let innerPolygons: number[][][] = [];

  if (!data["gml:interior"]) {
    return {
      outerPolygon,
      innerPolygons,
    };
  }

  // Parcel inner holes
  const interiorDataArray = Array.isArray(data["gml:interior"])
    ? data["gml:interior"]
    : [data["gml:interior"]];

  innerPolygons = interiorDataArray.map((interiorItem) => {
    const interiorData =
      interiorItem["gml:LinearRing"]["gml:posList"]._text.split(" ");
    const result: number[][] = [];
    for (let i = 0; i < interiorData.length; i += 2) {
      const first = interiorData[i + 1];
      const second = interiorData[i];
      if (first && second) {
        result.push([+first, +second]);
      }
    }
    return result;
  });

  return {
    outerPolygon,
    innerPolygons,
  };
};

export const getParcelByLngLat = async (latLng: LngLat) => {
  const { lat, lng } = latLng;
  const res = await fetch(
    `https://services.cuzk.gov.cz/wfs/inspire-cp-wfs.asp?service=WFS&version=2.0.0&request=GetFeature&StoredQuery_id=GetFeatureByPoint&srsName=urn:ogc:def:crs:EPSG::4326&POINT=${lat},${lng}&FEATURE_TYPE=CadastralParcel`
  );

  if (res.status !== 200)
    throw new Error(`Error fetching cadastral info: ${res.statusText}`);

  const data = await getParsedXmlData<CUZK_CadastralParcel>(res);
  if (!data) throw new Error("No data found for the given coordinates.");

  const polygonDataParsed = parsePolygonData(
    data["cp:CadastralParcel"]?.["cp:geometry"]?.["gml:Polygon"]
  );
  const lngLat =
    data["cp:CadastralParcel"]?.["cp:referencePoint"]?.["gml:Point"]?.[
      "gml:pos"
    ]?._text?.split(" ");

  const ourDataShape = {
    localId: data?.["cp:CadastralParcel"]?.["cp:inspireId"]?.[
      "base:Identifier"
    ]?.["base:localId"]?._text?.replace("CP.", ""),
    landNumber: data?.["cp:CadastralParcel"]?.["cp:label"]?._text,
    cadastralId: data?.["cp:CadastralParcel"]?.["cp:nationalCadastralReference"]
      ?._text
      ? Number(
          data?.["cp:CadastralParcel"]?.[
            "cp:nationalCadastralReference"
          ]?._text?.split("-")[0]
        )
      : null,
    adId: "",
    area: data?.["cp:CadastralParcel"]?.["cp:areaValue"]?._text
      ? +data?.["cp:CadastralParcel"]["cp:areaValue"]._text
      : null,
    lv: null,
    definition_point: {
      type: "",
      crs: {
        type: "",
        properties: {
          name: "",
        },
      },
      coordinates: [
        lngLat[1] ? +lngLat[1] : null,
        lngLat[0] ? +lngLat[0] : null,
      ],
    },
    polygon: {
      coordinates: [
        [
          polygonDataParsed?.outerPolygon ?? [],
          ...(polygonDataParsed?.innerPolygons ?? []),
        ],
      ],
      crs: {
        properties: {
          name: "",
        },
        type: "",
      },
      type: "",
    },
    cadastral:
      data?.["cp:CadastralParcel"]?.["cp:zoning"]?._attributes["xlink:title"],
    zoning:
      data?.["cp:CadastralParcel"]?.["cp:administrativeUnit"]?._attributes[
        "xlink:title"
      ],
    partNumerator: 0,
    partDenominator: 0,
    usageType: 0,
    numerageType: 0,
    landType: 0,
    protectionType: [0],
    ownership: null,
    onlyAdReference: false,
    beginLifeSpan:
      data?.["cp:CadastralParcel"]?.["cp:beginLifespanVersion"]?._text ?? null,
  } as Parcel;

  if (!ourDataShape.polygon?.coordinates) return null;

  return {
    ...ourDataShape,
    polygon: {
      ...ourDataShape.polygon,
      coordinates: cleanupArray(ourDataShape.polygon.coordinates),
    },
  };
};
