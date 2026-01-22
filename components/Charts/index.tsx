import { Theme } from "@emotion/react";
import {
  ElementType,
  FC,
  Fragment,
  HTMLAttributes,
  MouseEventHandler,
  JSX,
  useState,
} from "react";
import { breakpoints } from "../../source/enums";
import { useSize } from "../SizeProvider";
import ColumnChart, { Props as ColumnChartProps } from "./ColumnChart";
import LineChart, { Props as LineChartProps } from "./LineChart";
import PieChart from "./PieChart";

const charts = {
  pie: PieChart,
  line: LineChart,
  column: ColumnChart,
};

type TooltipHandler = (
  data: ChartProps["dataPoints"][0]
) => MouseEventHandler<SVGPathElement | HTMLDivElement>;

export interface ChartProps {
  dataPoints: {
    name: string | number;
    value: number;
    color?: keyof Omit<Theme["colors"], "decks">;
    icon?: JSX.Element;
  }[];
  events?: {
    onShowTooltip: TooltipHandler;
    onHideTooltip: TooltipHandler;
    onMoveTooltip: TooltipHandler;
  };
}

interface Props
  extends HTMLAttributes<HTMLDivElement>,
    Pick<ChartProps, "dataPoints">,
    Pick<LineChartProps, "LabelFormatter" | "severity" | "strokeWidth">,
    Pick<ColumnChartProps, "maxHeight"> {
  type: keyof typeof charts;
  withTooltip?: boolean;
  TooltipFormatter?: ElementType<ChartProps["dataPoints"][0]>;
}

const Charts: FC<Props> = ({
  type,
  TooltipFormatter = ({ name, value }) => (
    <Fragment>
      {name}: {value}
    </Fragment>
  ),
  withTooltip,
  ...props
}) => {
  const Component = charts[type];
  const [data, setData] = useState<ChartProps["dataPoints"][number]>();
  const [{ x, y }, setTooltip] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const { width } = useSize();

  if (!withTooltip) {
    return <Component {...props} />;
  }

  const showTooltip: TooltipHandler =
    (dataPoint) =>
    ({ clientX, clientY }) => {
      setTooltip({ x: clientX, y: clientY });
      setData(dataPoint);
    };
  const moveTooltip: TooltipHandler =
    () =>
    ({ clientX, clientY }) =>
      setTooltip({ x: clientX, y: clientY });
  const hideTooltip: TooltipHandler = () => () => {
    setTooltip({ x: -100, y: -100 });
    setData(undefined);
  };

  return (
    <Fragment>
      <Component
        {...props}
        events={{
          onShowTooltip: showTooltip,
          onMoveTooltip: moveTooltip,
          onHideTooltip: hideTooltip,
        }}
      />
      {width >= breakpoints.sm && (
        <div css={{ position: "fixed", top: 0, left: 0, pointerEvents: "none" }}>
          <div
            css={(theme) => ({
              position: "absolute",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "18px",
              padding: "6px 10px 4px",
              background: "white",
              borderRadius: 50,
              color: theme.colors.black,
              whiteSpace: "nowrap",
              transition: "opacity 0.15s ease-out",
              transform: "translate(-50%, -100%)",
              marginTop: -8,
            })}
            style={{
              top: y,
              left: x,
              ...(data ? { opacity: 1 } : { opacity: 0 }),
            }}
          >
            {data && <TooltipFormatter {...data} />}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Charts;
