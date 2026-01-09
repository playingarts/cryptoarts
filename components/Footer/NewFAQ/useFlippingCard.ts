import { useState, useEffect, useCallback, useRef } from "react";
import {
  MIN_FLIP_INTERVAL,
  MAX_FLIP_INTERVAL,
} from "./constants";

type UseFlippingCardOptions<T> = {
  cards: T[];
  isPaused?: boolean;
};

type UseFlippingCardReturn<T> = {
  frontCard: T | null;
  backCard: T | null;
  rotation: number;
  currentCard: T | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
  setHovered: (hovered: boolean) => void;
};

export function useFlippingCard<T>({
  cards,
  isPaused: externalPaused = false,
}: UseFlippingCardOptions<T>): UseFlippingCardReturn<T> {
  // Card state
  const [frontCard, setFrontCard] = useState<T | null>(null);
  const [backCard, setBackCard] = useState<T | null>(null);
  const [rotation, setRotation] = useState(0);

  // Internal pause states
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // Refs for animation loop
  const rotationRef = useRef(0);
  const shownIndicesRef = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs to avoid stale closures
  const cardsRef = useRef(cards);
  cardsRef.current = cards;
  const frontCardRef = useRef(frontCard);
  frontCardRef.current = frontCard;
  const backCardRef = useRef(backCard);
  backCardRef.current = backCard;

  // Combined pause state
  const isPaused = isHovered || externalPaused || !isInView;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // Initialize cards when data changes
  useEffect(() => {
    if (cards.length === 0) return;

    const initialIndex = Math.floor(Math.random() * cards.length);
    setFrontCard(cards[initialIndex]);
    setBackCard(cards[initialIndex]);
    shownIndicesRef.current = new Set([initialIndex]);
  }, [cards]);

  // Intersection observer for pausing when not in view
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  const getRandomInterval = useCallback(
    () => MIN_FLIP_INTERVAL + Math.random() * (MAX_FLIP_INTERVAL - MIN_FLIP_INTERVAL),
    []
  );

  // Animation loop
  useEffect(() => {
    if (cards.length <= 1) return;

    let timeoutId: NodeJS.Timeout;

    const getNextIndex = () => {
      const currentCards = cardsRef.current;
      if (currentCards.length === 0) return 0;

      // If all cards have been shown, reset
      if (shownIndicesRef.current.size >= currentCards.length) {
        const isShowingFront = (rotationRef.current / 180) % 2 === 0;
        const currentCard = isShowingFront ? frontCardRef.current : backCardRef.current;
        const currentIdx = currentCard ? currentCards.indexOf(currentCard) : 0;
        shownIndicesRef.current = new Set([currentIdx >= 0 ? currentIdx : 0]);
      }

      // Get available indices
      const availableIndices: number[] = [];
      for (let i = 0; i < currentCards.length; i++) {
        if (!shownIndicesRef.current.has(i)) {
          availableIndices.push(i);
        }
      }

      if (availableIndices.length === 0) return 0;
      const newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      shownIndicesRef.current.add(newIndex);
      return newIndex;
    };

    const flip = () => {
      const currentCards = cardsRef.current;
      if (currentCards.length <= 1) return;

      const newIndex = getNextIndex();
      const isShowingFront = (rotationRef.current / 180) % 2 === 0;

      // Update the hidden face with new card BEFORE rotating
      if (isShowingFront) {
        setBackCard(currentCards[newIndex]);
      } else {
        setFrontCard(currentCards[newIndex]);
      }

      // Rotate after a small delay to ensure card is updated
      requestAnimationFrame(() => {
        rotationRef.current += 180;
        setRotation(rotationRef.current);
      });
    };

    const scheduleNextFlip = () => {
      const interval = getRandomInterval();
      timeoutId = setTimeout(() => {
        if (!isPausedRef.current) {
          flip();
        }
        scheduleNextFlip();
      }, interval);
    };

    // Start with initial delay
    const initialDelay = getRandomInterval();
    timeoutId = setTimeout(() => {
      if (!isPausedRef.current) {
        flip();
      }
      scheduleNextFlip();
    }, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [cards.length, getRandomInterval]);

  // Get the currently visible card
  const currentCard = (rotationRef.current / 180) % 2 === 0 ? frontCard : backCard;

  return {
    frontCard,
    backCard,
    rotation,
    currentCard,
    containerRef,
    isInView,
    setHovered: setIsHovered,
  };
}
