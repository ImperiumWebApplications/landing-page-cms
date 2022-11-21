/**
 * Strapi Types
 */

export type Relation<T> = {
  data: {
    id: number;
    attributes?: T;
  };
};

export type Relations<T> = {
  data: {
    id: number;
    attributes?: T;
  }[];
};

export type CollectionType<T> = {
  id: number;
  attributes: T;
}[];

export type SingleType<T> = {
  id: number;
  attributes: T;
};

export type DynamicZoneItem<T> = { id: number; __component: string } & T;
export type DynamicZone<T> = DynamicZoneItem<T>[] | null | undefined;

export type Component<T> = ({ id: number } & T) | null | undefined;

export type RepeatableComponent<T> = ({ id: number } & T)[] | null | undefined;

export type MediaAttributes = {
  name: string | null | undefined;
  alternativeText: string | null | undefined;
  caption: string | null | undefined;
  width: number;
  height: number;
  formats: Record<string, unknown> | null | undefined;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null | undefined;
  provider: string;
  provider_metadata: string | null | undefined;
  createdAt: string;
  updatedAt: string;
  related?: unknown;
  createdBy?: unknown;
  updatedBy?: unknown;
};

export type Media = Relation<MediaAttributes> | null | undefined;
export type MediaList = Relations<MediaAttributes> | null | undefined;

export type TextField = string | null | undefined;
export type EnumerationField<T> = T | null | undefined;
export type NumberField = number | null | undefined;
export type BooleanField = boolean | null | undefined;
