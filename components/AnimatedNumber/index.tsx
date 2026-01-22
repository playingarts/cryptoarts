import { FC, useState, useEffect, useRef } from "react";

type AnimatedNumberProps = {
  value: string | number;
  duration?: number;
  decimals?: number;
};

/**
 * Animated counter that counts up from 0 to target value when scrolled into view.
 * Supports numeric values with optional suffixes (e.g., "1100+", "85", "30").
 * Also supports decimal values when decimals prop is provided.
 */
const AnimatedNumber: FC<AnimatedNumberProps> = ({ value, duration = 1500, decimals }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const valueStr = String(value);

  // Check if value has decimals
  const hasDecimals = decimals !== undefined || valueStr.includes(".");
  const decimalPlaces = decimals ?? (valueStr.includes(".") ? (valueStr.split(".")[1]?.length || 0) : 0);

  // Extract numeric value and suffix (e.g., "1100+" -> 1100, "+")
  const numericMatch = valueStr.match(/^([\d,.]+)(.*)$/);
  const targetNumber = numericMatch
    ? parseFloat(numericMatch[1].replace(/,/g, ""))
    : 0;
  const suffix = numericMatch ? numericMatch[2] : "";
  // Preserve leading zeros (e.g., "08" -> 2 digits)
  const cleanNumStr = numericMatch ? numericMatch[1].replace(/,/g, "").split(".")[0] : "0";
  const padLength = cleanNumStr.length;

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          // Animate from 0 to target
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * targetNumber;

            let formattedValue: string;
            if (hasDecimals) {
              // Format with decimals
              formattedValue = current >= 1000
                ? current.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })
                : current.toFixed(decimalPlaces);
            } else {
              // Integer formatting
              const rounded = Math.round(current);
              const paddedValue = rounded.toString().padStart(padLength, "0");
              formattedValue = rounded >= 1000
                ? rounded.toLocaleString()
                : paddedValue;
            }
            setDisplayValue(formattedValue + suffix);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNumber, suffix, padLength, duration, hasAnimated, hasDecimals, decimalPlaces]);

  return <span ref={ref}>{displayValue}</span>;
};

export default AnimatedNumber;
