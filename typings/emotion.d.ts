import "@emotion/react";
import { CSSProperties } from "react";

declare module "@emotion/react" {
  export interface Theme {
    transitions: {
      fast: (attr: string) => string;
    };
    colors: {
      gray: string;
      darkGray: string;
      eth: string;
      whiteish: string;
      dimWhite: string;
      ethButton: string;
      text_title_dark: string;
      text_title_light: string;
    };
    fonts: { aldrichFont: string };
    mq: { [index: string]: string };
    gutter: (scale: number) => string;
    spacing: (size: number) => number;
  }
}

export {};
