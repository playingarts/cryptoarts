import { useEffect, useState } from "react";
import { usePalette, Props } from "../new/Pages/Deck/DeckPaletteContext";

export function usePaletteHook(paletteProp?: Props["palette"]) {
  const { palette: paletteContext } = usePalette();
  const [palette, setPalette] = useState(paletteProp ?? paletteContext);

  useEffect(() => {
    if (paletteProp === undefined) {
      setPalette(paletteContext);
    } else {
      setPalette(paletteProp);
    }
  }, [paletteProp, paletteContext]);

  return { palette };
}
