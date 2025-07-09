import { Marker, Popup } from "maplibre-gl";
import { z } from "zod";

const ownershipType = z.enum(["private", "state", "municipal", "other"]);

export const geoJSONPointSchema = z.object({
  type: z.string(),
  crs: z.object({
    type: z.string(),
    properties: z.object({
      name: z.string(),
    }),
  }),
  coordinates: z.number().array(),
});

const geoJSONSchema = z.object({
  type: z.string(),
  crs: z.object({
    type: z.string(),
    properties: z.object({
      name: z.string(),
    }),
  }),
  coordinates: z.number().array().array().array().array(),
});

const parcelType = z.object({
  // Frontend specific fields
  popupReference: z.custom<Popup>().nullish(), // Reference to the popup, for later removal
  markerReference: z.custom<Marker>().nullish(), // Reference to the marker, for later removal
  beginLifeSpan: z.string().nullish(), // Take from cuzk
  // The rest is from the API
  externalLink: z.string().nullable(), // If the parcel is not known, we can link to the external source
  localId: z.string().nullable(),
  landNumber: z.string().nullable(),
  cadastralId: z.number(),
  adId: z.string(), // Advertisement id
  area: z.number().nullable(),
  lv: z.string().nullable(),
  definition_point: geoJSONPointSchema.nullable(),
  polygon: geoJSONSchema.nullable(),
  cadastral: z.string(), // Can be different name - katastr
  zoning: z.string(), // Can be different name - okres
  partNumerator: z.number(),
  partDenominator: z.number(),
  usageType: z.number().int().nullable(),
  numerageType: z.number().int().nullable(),
  landType: z.number().int().nullable(),
  protectionType: z.array(z.number().int()).nullable(),
  ownership: ownershipType.nullable(), // Idnes reality,
  onlyAdReference: z.boolean(),
  transaction_count: z.number().nullable(),
  stateHashId: z.string().nullable(),
});

export type Parcel = z.infer<typeof parcelType>;
