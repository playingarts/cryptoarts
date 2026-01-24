import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { HomeCard } from "../../../../Contexts/heroCarousel";

type UseFlippingCardOptions = {
  cards: HomeCard[];
  initialIndex: number;
  minInterval?: number;
  maxInterval?: number;
  isPaused?: boolean;
};

type UseFlippingCardReturn = {
  frontCard: HomeCard;
  backCard: HomeCard;
  rotation: number;
  currentCard: HomeCard;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  setHovered: (hovered: boolean) => void;
};

export function useFlippingCard({
  cards,
  initialIndex,
  minInterval = 3000,
  maxInterval = 8000,
  isPaused: externalPaused = false,
}: UseFlippingCardOptions): UseFlippingCardReturn {
  // Use refs for cards to avoid re-renders during animation
  const frontCardRef = useRef(cards[initialIndex % cards.length]);
  const backCardRef = useRef(cards[initialIndex % cards.length]);
  const rotationRef = useRef(0);

  // Track shown indices - reset when all have been shown
  const shownIndicesRef = useRef<Set<number>>(new Set([initialIndex % cards.length]));

  // Only rotation triggers re-render
  const [rotation, setRotation] = useState(0);

  // Internal pause states
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);

  // Ref for intersection observer
  const containerRef = useRef<HTMLDivElement>(null);

  // Combined pause state
  const isPaused = useMemo(
    () => isHovered || !isTabVisible || externalPaused || !isInView,
    [isHovered, isTabVisible, externalPaused, isInView]
  );
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // Listen for viewport visibility with Intersection Observer
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Listen for tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const getRandomInterval = useCallback(
    () => minInterval + Math.random() * (maxInterval - minInterval),
    [minInterval, maxInterval]
  );

  const getNextIndex = useCallback(() => {
    // If all cards have been shown, reset the tracking
    if (shownIndicesRef.current.size >= cards.length) {
      // Keep only the current index so we don't repeat immediately
      const currentIdx = Math.floor((rotationRef.current / 180) % 2) === 0
        ? cards.indexOf(frontCardRef.current)
        : cards.indexOf(backCardRef.current);
      shownIndicesRef.current = new Set([currentIdx >= 0 ? currentIdx : 0]);
    }

    // Get available indices (not yet shown)
    const availableIndices: number[] = [];
    for (let i = 0; i < cards.length; i++) {
      if (!shownIndicesRef.current.has(i)) {
        availableIndices.push(i);
      }
    }

    // Pick a random one from available
    const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    shownIndicesRef.current.add(newIndex);

    return newIndex;
  }, [cards]);

  const flip = useCallback(() => {
    // Prepare the back face with new card BEFORE starting rotation
    const newIndex = getNextIndex();
    const isShowingFront = (rotationRef.current / 180) % 2 === 0;

    if (isShowingFront) {
      backCardRef.current = cards[newIndex];
    } else {
      frontCardRef.current = cards[newIndex];
    }

    // Use requestAnimationFrame to ensure DOM has updated before rotating
    requestAnimationFrame(() => {
      rotationRef.current += 180;
      setRotation(rotationRef.current);
    });
  }, [getNextIndex, cards]);

  // Animation loop
  useEffect(() => {
    if (cards.length <= 1) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNextFlip = () => {
      const interval = getRandomInterval();
      timeoutId = setTimeout(() => {
        if (!isPausedRef.current) {
          flip();
        }
        scheduleNextFlip();
      }, interval);
    };

    // Initial random delay before first flip
    const initialDelay = getRandomInterval();
    timeoutId = setTimeout(() => {
      if (!isPausedRef.current) {
        flip();
      }
      scheduleNextFlip();
    }, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [cards.length, flip, getRandomInterval]);

  // Get the currently visible card
  const currentCard = useMemo(() => {
    const isShowingFront = (rotation / 180) % 2 === 0;
    return isShowingFront ? frontCardRef.current : backCardRef.current;
  }, [rotation]);

  return {
    frontCard: frontCardRef.current,
    backCard: backCardRef.current,
    rotation,
    currentCard,
    containerRef,
    isInView,
    setHovered: setIsHovered,
  };
}
