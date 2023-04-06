import {
  createContext,
  FC,
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

const SizeProvider: FC = ({ children }) => {
  const [width, setWidth] = useState(0);

  (typeof window === undefined ? useEffect : useLayoutEffect)(() => {
    setWidth(
      Number(
        Object.keys(breakpoints)
          .filter((value) => isNaN(Number(value)) === false)
          .reverse()
          .find((item: any) => item < window.innerWidth + 1)
      )
    );
    const listener = () => {
      setWidth(
        Number(
          Object.keys(breakpoints)
            .filter((value) => isNaN(Number(value)) === false)
            .reverse()
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
