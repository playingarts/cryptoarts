import { FC, HTMLAttributes } from "react";
import { useResizeDetector } from "react-resize-detector";
import { ChartProps } from "..";
import Text from "../../../components/Text";

export interface Props extends HTMLAttributes<HTMLElement>, ChartProps {
  minHeight?: number;
}

const ColumnChart: FC<Props> = ({
  minHeight = 115,
  dataPoints,
  events,
  ...props
}) => {
  const { ref } = useResizeDetector<HTMLDivElement>();
  const values = dataPoints.reduce(
    ({ biggest, smallest }, { value }) => ({
      biggest: Math.max(value, biggest),
      smallest: Math.min(value, smallest),
    }),
    { biggest: 0, smallest: dataPoints[0].value }
  );
  const getHeightPercent = (clientHeight: number, value: number) =>
    (100 -
      (values.biggest - value) *
        ((((clientHeight - minHeight) / clientHeight) * 100) /
          (values.biggest - values.smallest))) /
    100;

  return (
    <div
      css={(theme) => ({
        display: "flex",
        flexWrap: "wrap",
        height: "100%",
        gap: theme.spacing(3),
        [theme.maxMQ.sm]: {
          gap: theme.spacing(1),
        },
      })}
      ref={ref}
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
              height: theme.spacing(15.5),
            },
          })}
        >
          <div
            css={(theme) => ({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: theme.spacing(2),
              paddingBottom: theme.spacing(1),
              borderRadius: theme.spacing(1),
              rowGap: theme.spacing(2),
              width: "100%",
              [theme.maxMQ.sm]: {
                width: theme.spacing(5.3),
                paddingTop: theme.spacing(1),
                borderRadius: theme.spacing(0.8),
              },
              background: color ? theme.colors[color] : "red",
            })}
            style={{
              minHeight: minHeight,
              ...(ref.current && {
                height: `${getHeightPercent(200, value) * 200}px`,
              }),
            }}
            {...(events && {
              onMouseEnter: events.onShowTooltip(dataPoints[index]),
              onMouseLeave: events.onHideTooltip(dataPoints[index]),
              onMouseMove: events.onMoveTooltip(dataPoints[index]),
            })}
          >
            {icon}
            <Text
              variant="h4"
              css={(theme) => ({
                margin: 0,
                [theme.maxMQ.sm]: [theme.typography.h3, { fontSize: 25 }],
              })}
            >
              {value}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColumnChart;
