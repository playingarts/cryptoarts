import { useState, useEffect } from "react";
import { breakpoints } from "../source/enums";

function getWindowDimensions() {
  const width = typeof window === "undefined" ? 0 : window.innerWidth;

  return {
    width: Number(
      Object.keys(breakpoints)
        .filter((value) => isNaN(Number(value)) === false)
        .reverse()
        .find((item: any) => item < width + 1)
    ),
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
