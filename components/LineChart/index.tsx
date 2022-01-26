import {
  FC,
  HTMLAttributes,
  useEffect,
  useState,
  useRef,
  ElementType,
  Fragment,
} from "react";
import Text from "../Text";

interface Props extends HTMLAttributes<SVGElement> {
  data: { x: number; y: number }[];
  severity?: number;
  strokeWidth?: number;
  LabelFormatter?: ElementType<{ value: number }>;
}

const LineChart: FC<Props> = ({
  severity,
  data,
  strokeWidth = 2.5,
  LabelFormatter = ({ value }) => <Fragment>{value}</Fragment>,
  ...props
}) => {
  const [{ width, height }, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const dataMax = data.reduce((current, { y }) => Math.max(current, y), 0);
  const getX = (index: number) => (width / (data.length - 1)) * index;
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
          {...props}
        >
          <path
            d={data
              .map(
                ({ y }, index) =>
                  index === 0
                    ? "M " + getX(index) + "," + getY(y)
                    : [
                        "C",
                        [
                          getX(index - 1) + getSeverity(),
                          getY(data[index - 1].y),
                        ].join(","),
                        [getX(index) - getSeverity(), +getY(y)].join(","),
                        [getX(index), getY(y)].join(","),
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
        {data.map(({ x }, index) => (
          <li
            key={index}
            css={{
              textAlign:
                index === 0
                  ? "left"
                  : index === data.length - 1
                  ? "right"
                  : "center",
            }}
            style={
              index > 0 && index < data.length - 1
                ? { width: width / (data.length - 1) }
                : { width: width / (data.length - 1) / 2 }
            }
          >
            <Text
              variant="h6"
              css={[
                {
                  margin: 0,
                  opacity: 0.5,
                },
                index > 0 &&
                  index < data.length - 1 && {
                    marginLeft: -1000,
                    marginRight: -1000,
                  },
              ]}
            >
              <LabelFormatter value={x} />
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LineChart;
