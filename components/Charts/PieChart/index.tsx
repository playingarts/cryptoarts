import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { ChartProps } from "..";

interface Props extends HTMLAttributes<HTMLDivElement>, ChartProps {}

const PieChart: FC<Props> = ({ dataPoints, events, ...props }) => {
  const [{ width, height }, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const total = dataPoints.reduce((sum, obj) => obj.value + sum, 0);
  const getCoordinatesForPercent = (percent: number) => [
    Math.cos(2 * Math.PI * percent),
    Math.sin(2 * Math.PI * percent),
  ];
  const size = height < width && height > 0 ? height : width;
  const lastSliceColor = dataPoints[dataPoints.length - 1].color;
  let cumulativePercent = 0;
  const slices = dataPoints.map((dataPoint) => {
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
    const percent = dataPoint.value / total;

    cumulativePercent += percent;

    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    return {
      d: [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        "L 0 0",
      ].join(" "),
      fill: dataPoint.color,
    };
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setSize(ref.current.getBoundingClientRect());
  }, []);

  return (
    <div
      {...props}
      ref={ref}
      css={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          borderRadius: "100%",
        }}
        style={{
          width: size,
          height: size,
          background: `conic-gradient(from ${
            -(dataPoints[dataPoints.length - 1].value / total) * 360 - 1
          }deg at 50% 50%, ${lastSliceColor} 0deg, black ${
            (dataPoints[dataPoints.length - 1].value / total) * 360 + 40
          }deg)`,
        }}
      >
        <svg
          viewBox="-1 -1 2 2"
          width={size}
          height={size}
          css={{ transform: "rotate(-90deg)" }}
        >
          {slices.map(({ d, fill }, index) => (
            <path
              key={d}
              d={d}
              fill={slices.length - 1 === index ? "transparent" : fill}
              {...(events && {
                onMouseEnter: events.onShowTooltip(dataPoints[index]),
                onMouseLeave: events.onHideTooltip(dataPoints[index]),
                onMouseMove: events.onMoveTooltip(dataPoints[index]),
              })}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default PieChart;
