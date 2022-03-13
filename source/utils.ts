import { isValidElement as reactValidElement } from "react";

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export const isValidElement = (element: any): element is JSX.Element =>
  reactValidElement(element);
