import { FC, HTMLAttributes } from "react";
import Eth from "../Icons/Eth";
import Line from "../Line";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string | JSX.Element;
  value: string | number;
  eth?: boolean;
  palette?: "light" | "dark";
}

const Stat: FC<Props> = ({ palette, label, value, eth, ...props }) => {
  return (
    <div {...props}>
      <Text
        variant="h3"
        css={(theme) => [
          {
            display: "flex",
            margin: 0,
            alignItems: "baseline",
            [theme.maxMQ.sm]: theme.typography.h2,
          },
        ]}
      >
        {value}
        {eth && (
          <Eth
            css={(theme) => ({
              marginLeft: theme.spacing(1),
              opacity: 0.2,
            })}
          />
        )}
      </Text>

      <Text
        variant="h7"
        css={(theme) => [
          {
            opacity: 0.5,
            margin: 0,
            marginTop: "-0.4em",
            [theme.maxMQ.sm]: { fontSize: 14 },
          },
        ]}
      >
        {label}
      </Text>
      <Line palette={palette} spacing={0.5} css={{ marginBottom: 0 }} />
    </div>
  );
};

export default Stat;
