import { FC, HTMLAttributes } from "react";
import Text from "../../Text";
import { ChartProps } from "..";
import { useResizeDetector } from "react-resize-detector";

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
    100 -
    (values.biggest - value) *
      ((((clientHeight - minHeight) / clientHeight) * 100) /
        (values.biggest - values.smallest));

  return (
    <div
      css={(theme) => ({
        display: "flex",
        alignItems: "flex-end",
        height: "100%",
        columnGap: theme.spacing(2),
      })}
      ref={ref}
      {...props}
    >
      {dataPoints.map(({ value, color, icon }, index) => (
        <div
          key={index}
          css={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(1),
            borderRadius: theme.spacing(1),
            rowGap: theme.spacing(2),
            width: theme.spacing(8.8),
          })}
          style={{
            minHeight: minHeight,
            background: color,
            ...(ref.current && {
              height: `${getHeightPercent(ref.current.clientHeight, value)}%`,
            }),
          }}
          {...(events && {
            onMouseEnter: events.onShowTooltip(dataPoints[index]),
            onMouseLeave: events.onHideTooltip(dataPoints[index]),
            onMouseMove: events.onMoveTooltip(dataPoints[index]),
          })}
        >
          {icon}
          <Text variant="h4" css={{ margin: 0 }}>
            {value}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default ColumnChart;
