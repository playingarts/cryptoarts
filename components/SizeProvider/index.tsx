import {
  createContext,
  FC,
  HTMLAttributes,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { breakpoints } from "../../source/enums";

export const SizeContext = createContext({} as { width: number });

export const useSize = () => {
  return useContext(SizeContext);
};

const SizeProvider: FC<
  HTMLAttributes<HTMLElement> & { isMobile?: boolean }
> = ({ isMobile, children }) => {
  const [width, setWidth] = useState(isMobile ? 0 : 1440);

  (typeof window === "undefined" ? useEffect : useLayoutEffect)(() => {
    const listener = () => {
      setWidth(
        Number(
          Object.keys(breakpoints)
            .filter((value) => isNaN(Number(value)) === false)
            .reverse()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .find((item: any) => item < window.innerWidth + 1)
        )
      );
    };

    window.addEventListener("resize", listener);
    listener();

    return () => window.removeEventListener("resize", listener);
  }, [setWidth]);

  return (
    <SizeContext.Provider value={{ width }}> {children}</SizeContext.Provider>
  );
};

export default SizeProvider;
