"use client";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import { typographyLiterals } from "../../styles/theme";
import {
  usePalette,
  Props as PaletteProps,
} from "../Pages/Deck/DeckPaletteContext";

export interface Props {
  typography?: keyof typeof typographyLiterals;
  loading?: boolean;
  palette?: PaletteProps["palette"];
}

const Text: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  palette: paletteProp = undefined,
  typography = "p",
  loading = false,
  ...props
}) => {
  const { palette: paletteContext } = usePalette();
  const [palette, setPalette] = useState(paletteProp ?? paletteContext);

  useEffect(() => {
    if (paletteProp === undefined) {
      setPalette(paletteContext);
    } else {
      setPalette(paletteProp);
    }
  }, [paletteProp, paletteContext]);

  return (
    <div
      css={(theme) => [
        (theme.typography as any)[typography],
        {
          color: theme.colors[palette === "dark" ? "white75" : "dark_gray"],
        },
        loading && {
          "@keyframes loadingPlaceholder": {
            "0%": {
              background: theme.colors.pale_gray,
            },
            "50%": {
              background: theme.colors.soft_gray,
            },
            "100%": {
              background: theme.colors.pale_gray,
            },
            animation: "loadingPlaceholder 500ms infinite linear",
          },
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default Text;
