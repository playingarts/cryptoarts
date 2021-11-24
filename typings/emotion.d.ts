import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    transitions: {
      fast: string;
    };
    colors: {
      gray: string;
      darkGray: string;
      eth: string;
      whiteish: string;
      dimWhite: string;
    };
    fonts: {
      aldrichFont: string;
    };
    mq: { [index: string]: string };
    gutter: (scale: number) => string;
  }
}

export {};
