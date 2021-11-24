import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
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
  }
}

export {};
