"use client";

import { FC, HTMLAttributes, createContext, useContext, useState, useCallback, useRef } from "react";

interface FlyingFavContextType {
  triggerFly: (startX: number, startY: number) => void;
  onFlyComplete: (callback: () => void) => void;
  isPopupOpen: boolean;
  setPopupOpen: (open: boolean) => void;
}

const FlyingFavContext = createContext<FlyingFavContextType>({
  triggerFly: () => {},
  onFlyComplete: () => {},
  isPopupOpen: false,
  setPopupOpen: () => {},
});

export const useFlyingFav = () => useContext(FlyingFavContext);

interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

export const FlyingFavProvider: FC<HTMLAttributes<HTMLElement>> = ({ children }) => {
  const [flyingStars, setFlyingStars] = useState<FlyingStar[]>([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const flyCompleteCallbackRef = useRef<(() => void) | null>(null);

  const triggerFly = useCallback((startX: number, startY: number) => {
    const id = Date.now();
    setFlyingStars((prev) => [...prev, { id, startX, startY }]);

    // Remove after animation completes and trigger callback
    setTimeout(() => {
      setFlyingStars((prev) => prev.filter((star) => star.id !== id));
      flyCompleteCallbackRef.current?.();
    }, 500);
  }, []);

  const onFlyComplete = useCallback((callback: () => void) => {
    flyCompleteCallbackRef.current = callback;
  }, []);

  return (
    <FlyingFavContext.Provider value={{ triggerFly, onFlyComplete, isPopupOpen, setPopupOpen }}>
      {children}
      {/* Render flying stars */}
      {flyingStars.map((star) => (
        <FlyingStarAnimation key={star.id} startX={star.startX} startY={star.startY} />
      ))}
    </FlyingFavContext.Provider>
  );
};

const FlyingStarAnimation: FC<{ startX: number; startY: number }> = ({ startX, startY }) => {
  // Target is the floating fav button (right: 30px, bottom: 30px, 60x60 button)
  const endX = typeof window !== "undefined" ? window.innerWidth - 30 - 30 : 0; // right edge - margin - half button width
  const endY = typeof window !== "undefined" ? window.innerHeight - 30 - 30 : 0; // bottom edge - margin - half button height

  return (
    <div
      css={{
        position: "fixed",
        left: startX,
        top: startY,
        width: 24,
        height: 24,
        pointerEvents: "none",
        zIndex: 999999,
        animation: "flyToFav 0.5s ease-in-out forwards",
        "@keyframes flyToFav": {
          "0%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
          },
          "50%": {
            transform: `translate(${(endX - startX) * 0.5}px, ${(endY - startY) * 0.5 - 50}px) scale(1.5)`,
            opacity: 1,
          },
          "100%": {
            transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.5)`,
            opacity: 0,
          },
        },
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 23 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 8.02969H14.2006L11.5 0L8.79942 8.02969H0L7.19756 12.9703L4.39444 21L11.5 16.0238L18.6056 21L15.7972 12.9703L23 8.02969Z"
          fill="#6A5ACD"
        />
      </svg>
    </div>
  );
};
