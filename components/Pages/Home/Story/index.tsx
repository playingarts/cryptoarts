import { FC, HTMLAttributes, useState, useEffect, useRef } from "react";
import Grid from "../../../Grid";
import Text from "../../../Text";
import CardSmall from "./CardSmall";
import ArrowedButton from "../../../Buttons/ArrowedButton";
import { STORY_STATS } from "./constants";

// Animated counter that counts up from 0 to target value
type AnimatedNumberProps = {
  value: string;
  duration?: number;
};

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Extract numeric value and suffix (e.g., "1100+" -> 1100, "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";
  // Preserve leading zeros (e.g., "08" -> 2 digits)
  const padLength = numericMatch ? numericMatch[1].length : 0;

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
            const current = Math.round(easeOut * targetNumber);

            // Pad with leading zeros if needed
            const paddedValue = current.toString().padStart(padLength, "0");
            setDisplayValue(paddedValue + suffix);

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
  }, [targetNumber, suffix, padLength, duration, hasAnimated]);

  return <span ref={ref}>{displayValue}</span>;
};

// Shared styles for content sections
const contentWrapperStyles = (theme: { maxMQ: { sm: string } }) => ({
  gridColumn: "span 6/-1",
  zIndex: 0,
  [theme.maxMQ.sm]: {
    // Mobile styles - to be implemented
  },
  position: "relative" as const,
});

const Story: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <div css={{ position: "relative", contain: "paint" }} {...props}>
    <Grid
      css={(theme) => [
        {
          background: theme.colors.soft_gray,
          paddingTop: 30,
          paddingBottom: 120,
          gridColumn: "1/-1",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        },
      ]}
    >
      <div css={(theme) => [contentWrapperStyles(theme)]}>
        <ArrowedButton>Where art meets play</ArrowedButton>
        <Text typography="paragraphBig" css={[{ paddingTop: 120 }]}>
          Playing Arts brings together artists from around the world,
          transforming traditional playing cards into a diverse gallery of
          creative expression.
        </Text>
        <Grid auto={true} css={(theme) => [{ paddingTop: theme.spacing(6) }]}>
          {STORY_STATS.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              css={{
                gridColumn: "span 2",
                paddingTop: 15,
                boxShadow: "0px -1px 0px rgba(0, 0, 0, 1)",
              }}
            >
              <Text typography="newh3">
                <AnimatedNumber value={stat.value} />
              </Text>
              <Text typography="newh4">{stat.label}</Text>
            </div>
          ))}
        </Grid>
      </div>
    </Grid>
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          gridColumn: "1/-1",
          [theme.maxMQ.sm]: {
            // Mobile styles - to be implemented
          },
        },
      ]}
    >
      <div
        css={(theme) => [
          contentWrapperStyles(theme),
          { paddingTop: 30 },
        ]}
      >
        <Text typography="newh4">Explore the collection</Text>
        <Text typography="paragraphBig" css={[{ padding: "120px 0" }]}>
          Eight editions where each deck is a curated showcase of 55 unique
          artworks, created by 55 different international artists.
        </Text>
      </div>
    </Grid>

    <CardSmall />
  </div>
);

export default Story;
