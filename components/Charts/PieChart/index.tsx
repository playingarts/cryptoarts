import { FC, Fragment, HTMLAttributes } from "react";
import { useResizeDetector } from "react-resize-detector";
import { ChartProps } from "..";
import { colorLiterals, theme } from "../../../styles/theme";

interface Props extends HTMLAttributes<HTMLDivElement>, ChartProps {}

// const lavender = theme.colors.lavender_blue;
// const light_cyan = theme.colors.light_cyan;

const colors = theme.colors;

const PieChart: FC<Props> = ({ dataPoints, events, ...props }) => {
  // const [{ width, height }, setSize] = useState<{
  //   width: number;
  //   height: number;
  // }>({ width: 0, height: 0 });
  const { width = 0, height = 0, ref } = useResizeDetector<HTMLDivElement>();
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
      fill: colors[dataPoint.color || "dark_gray"],
    };
  });

  return (
    <div
      {...props}
      ref={ref}
      css={{
        // height: "100%",
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
          // background: conic-gradient(from 12.11deg at 50% 50%, #404040 0deg, #000000 360deg);
          background: `conic-gradient(from ${
            -(dataPoints[dataPoints.length - 1].value / total) * 360 - 1
          }deg at 50% 50%, ${
            lastSliceColor ? theme.colors[lastSliceColor] : "black"
          } 0deg, black ${
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
          {slices.map(({ d }, index) => {
            return (
              <Fragment key={d}>
                <defs>
                  {/* <radialGradient id={`linearGradient${index}`}>
                    <stop offset="0%" stopColor={lavender} />
                    <stop offset="100%" stopColor={light_cyan} />
                  </radialGradient> */}
                  <clipPath id={`pieChartClip${index}`}>
                    <path
                      d={d}
                      {...(slices.length - 1 !== index && {
                        mask: `url(#pieChartMask${index})`,
                      })}
                    />
                  </clipPath>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  x="-1"
                  y="-1"
                  css={{ position: "absolute" }}
                  fill={
                    slices.length - 1 !== index
                      ? colorLiterals.mint
                      : // ? `url(#linearGradient${index})`
                        "transparent"
                  }
                  clipPath={`url(#pieChartClip${index})`}
                  {...(events && {
                    onMouseEnter: events.onShowTooltip(dataPoints[index]),
                    onMouseLeave: events.onHideTooltip(dataPoints[index]),
                    onMouseMove: events.onMoveTooltip(dataPoints[index]),
                  })}
                />
              </Fragment>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default PieChart;
