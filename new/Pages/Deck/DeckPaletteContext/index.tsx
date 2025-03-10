import { useRouter } from "next/router";
import {
  FC,
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface Props {
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

  useLayoutEffect(() => {
    setPalette(deckId === "crypto" ? "dark" : "light");
  }, [deckId]);

  return (
    <PaletteContext.Provider value={{ palette }}>
      {children}
    </PaletteContext.Provider>
  );
};
