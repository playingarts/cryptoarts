import { isValidElement as reactValidElement } from "react";

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export const isValidElement = (element: any): element is JSX.Element =>
  reactValidElement(element);

export const mapSeries = async <T>(iterable: T[], action: (x: T) => any) => {
  for (const x of iterable) {
    await action(x);
  }
};
