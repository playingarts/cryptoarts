import { FC, HTMLAttributes, useEffect, useState } from "react";
import { usePalette } from "../Pages/Deck/DeckPaletteContext";

export interface Props {
  opacity?: number;
  palette?: "dark" | string;
}

const ScandiBlock: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
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
    const defaultOpacity = palette === "dark" ? 0.1 : 1;
    const tempopacity = opacity ?? defaultOpacity;
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
          borderTop: `1px solid ${color}`,
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
