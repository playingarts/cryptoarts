import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { ChartProps } from "..";

export interface Props extends HTMLAttributes<HTMLElement>, ChartProps {
  /** Maximum height in pixels for the tallest bar */
  maxHeight?: number;
  /** Minimum height as percentage of max (0-1). E.g., 0.5 means shortest bar is 50% of tallest */
  minHeightPercent?: number;
  /** Initial height before animation (default 100px) */
  initialHeight?: number;
}

const ColumnChart: FC<Props> = ({
  maxHeight = 220,
  minHeightPercent = 0.5,
  initialHeight = 100,
  dataPoints,
  events,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxValue = Math.max(...dataPoints.map((d) => d.value));
  const minValue = Math.min(...dataPoints.map((d) => d.value));

  // Scale values to range from minHeightPercent to 1
  const getHeight = (value: number) => {
    if (maxValue === minValue) return maxHeight;
    const normalizedPercent = (value - minValue) / (maxValue - minValue); // 0 to 1
    const scaledPercent = minHeightPercent + normalizedPercent * (1 - minHeightPercent);
    return scaledPercent * maxHeight;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      css={(theme) => ({
        display: "flex",
        flexWrap: "wrap",
        height: "100%",
        gap: theme.spacing(3),
        [theme.maxMQ.sm]: {
          // Mobile styles - to be implemented
        },
      })}
      {...props}
    >
      {dataPoints.map(({ value, color, icon }, index) => (
        <div
          key={index}
          css={(theme) => ({
            height: theme.spacing(20),
            alignItems: "flex-end",
            display: "flex",
            flexGrow: 1,
            flexBasis: 1,
            [theme.maxMQ.sm]: {
              // Mobile styles - to be implemented
            },
          })}
        >
          <div
            css={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: 15,
              borderRadius: theme.spacing(1),
              rowGap: theme.spacing(2),
              width: "100%",
              transition: "height 0.6s ease-out",
              [theme.maxMQ.sm]: {
                // Mobile styles - to be implemented
              },
              background: color ? theme.colors[color] : "red",
            })}
            style={{
              height: isVisible ? getHeight(value) : initialHeight,
            }}
            {...(events && {
              onMouseEnter: events.onShowTooltip(dataPoints[index]),
              onMouseLeave: events.onHideTooltip(dataPoints[index]),
              onMouseMove: events.onMoveTooltip(dataPoints[index]),
            })}
          >
            <div
              css={{
                fontFamily: "Aldrich, sans-serif",
                fontWeight: 400,
                lineHeight: 1,
                margin: 0,
                fontSize: 30,
                letterSpacing: 0,
              }}
            >
              {value}
            </div>
            {icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColumnChart;
