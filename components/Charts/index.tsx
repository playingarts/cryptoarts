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
import Text from "../Text";
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
    Pick<ColumnChartProps, "minHeight"> {
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
        <div css={{ position: "fixed", top: 0, left: 0 }}>
          <Text
            variant="h6"
            component="div"
            css={(theme) => ({
              position: "absolute",
              background: theme.colors.white,
              borderRadius: theme.spacing(0.5),
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1),
              paddingTop: theme.spacing(0.3),
              marginTop: theme.spacing(1),
              marginLeft: theme.spacing(1),
              transition: theme.transitions.fast("opacity"),
              color: theme.colors.text_subtitle_dark,
              whiteSpace: "nowrap",
            })}
            style={{
              top: y,
              left: x,
              ...(data ? { opacity: 1 } : { opacity: 0 }),
            }}
          >
            {data && <TooltipFormatter {...data} />}
          </Text>
        </div>
      )}
    </Fragment>
  );
};

export default Charts;
