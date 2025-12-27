import { useRouter } from "next/router";
import {
  FC,
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDeckConfig } from "../../../../source/deckConfig";

export interface Props {
  palette: "light" | "dark";
}

export const PaletteContext = createContext({} as Props);

export const usePalette = () => {
  return useContext(PaletteContext);
};

export const DeckPaletteProvider: FC<HTMLAttributes<HTMLElement>> = ({
  children,
}) => {
  const [palette, setPalette] = useState<Props["palette"]>("light");

  const {
    query: { deckId },
  } = useRouter();

  useEffect(() => {
    const config = getDeckConfig(typeof deckId === "string" ? deckId : undefined);
    setPalette(config.palette);
  }, [deckId]);

  return (
    <PaletteContext.Provider value={{ palette }}>
      {children}
    </PaletteContext.Provider>
  );
};
