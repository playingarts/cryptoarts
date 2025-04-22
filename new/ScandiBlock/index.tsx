import { FC, HTMLAttributes, useEffect, useState } from "react";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";

export interface Props {
  inset?: boolean;
  opacity?: number;
  palette?: "dark" | string;
}

const ScandiBlock: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  inset = false,
  opacity,
  palette: paletteProp = undefined,
  ...props
}) => {
  const { palette: palettecontext } = usePalette();

  const [color, setColor] = useState("");

  const [palette, setPalette] = useState(paletteProp ?? palettecontext);

  useEffect(() => {
    if (paletteProp === undefined) {
      setPalette(palettecontext);
    } else {
      setPalette(paletteProp);
    }
  }, [paletteProp, palettecontext]);

  useEffect(() => {
    const tempopacity =
      opacity === undefined ? (palette === "dark" ? 0.3 : 1) : opacity;
    setColor(
      palette === "dark"
        ? "rgba(255, 255, 255, " + tempopacity + ")"
        : "rgba(0, 0, 0, " + tempopacity + ")"
    );
  }, [palette, opacity]);

  return (
    <div
      css={[
        {
          display: "flex",
          boxShadow: inset
            ? `inset 0px 1px 0px ${color}`
            : `0px -1px 0px ${color}`,
          alignItems: "center",
          paddingTop: 15,
        },
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScandiBlock;
