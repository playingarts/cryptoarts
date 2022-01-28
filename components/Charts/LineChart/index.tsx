import {
  FC,
  HTMLAttributes,
  useEffect,
  useState,
  useRef,
  ElementType,
  Fragment,
} from "react";
import { ChartProps } from "..";
import Text from "../../Text";

export interface Props extends HTMLAttributes<HTMLDivElement>, ChartProps {
  severity?: number;
  strokeWidth?: number;
  LabelFormatter?: ElementType<{ name: ChartProps["dataPoints"][0]["name"] }>;
}

const LineChart: FC<Props> = ({
  severity,
  dataPoints,
  strokeWidth = 2.5,
  LabelFormatter = ({ name }) => <Fragment>{name}</Fragment>,
  ...props
}) => {
  const [{ width, height }, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const dataMax = dataPoints.reduce(
    (current, { value }) => Math.max(current, value),
    0
  );
  const getX = (index: number) => (width / (dataPoints.length - 1)) * index;
  const getY = (index: number) => height - (height / dataMax) * index;
  const getSeverity = () => severity || width * 0.05;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const { width, height } = ref.current.getBoundingClientRect();

    setSize({ width, height });
  }, []);

  return (
    <div
      {...props}
      css={(theme) => ({
        height: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: theme.spacing(1.5),
      })}
    >
      <div ref={ref} css={{ flexGrow: 1 }}>
        <svg
          viewBox={[0, -(strokeWidth / 2), width, height + strokeWidth].join(
            " "
          )}
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={dataPoints
              .map(
                ({ value }, index) =>
                  index === 0
                    ? "M " + getX(index) + "," + getY(value)
                    : [
                        "C",
                        [
                          getX(index - 1) + getSeverity(),
                          getY(dataPoints[index - 1].value),
                        ].join(","),
                        [getX(index) - getSeverity(), +getY(value)].join(","),
                        [getX(index), getY(value)].join(","),
                      ].join(" "),
                0
              )
              .join(" ")}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="73.0563"
              y1="-0.0629974"
              x2="449.014"
              y2="4.3357"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#82A7F8" />
              <stop offset="0.5" stopColor="#A6FBF6" />
              <stop offset="1" stopColor="#CDB0FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <ul
        css={{
          display: "flex",
          listStyle: "none",
          overflow: "hidden",
          padding: 0,
          margin: 0,
        }}
      >
        {dataPoints.map(({ name }, index) => {
          const isFirst = index === 0;
          const isLast = index === dataPoints.length - 1;

          return (
            <li
              key={index}
              css={{
                textAlign: isFirst ? "left" : isLast ? "right" : "center",
              }}
              style={
                !isFirst && !isLast
                  ? { width: width / (dataPoints.length - 1) }
                  : { width: width / (dataPoints.length - 1) / 2 }
              }
            >
              <Text
                variant="h6"
                css={[
                  {
                    margin: 0,
                    opacity: 0.5,
                  },
                  isLast && {
                    float: "right",
                  },
                  !isFirst &&
                    !isLast && {
                      marginLeft: -1000,
                      marginRight: -1000,
                    },
                ]}
              >
                <LabelFormatter name={name} />
              </Text>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LineChart;
