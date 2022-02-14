import { FC, HTMLAttributes } from "react";
import Eth from "../Icons/Eth";
import Line from "../Line";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  eth?: boolean;
}

const Stat: FC<Props> = ({ label, value, eth, ...props }) => {
  return (
    <div {...props}>
      <Text
        variant="h3"
        css={{ display: "flex", margin: 0, alignItems: "baseline" }}
      >
        {value}
        {eth && (
          <Eth
            css={(theme) => ({ marginLeft: theme.spacing(1), opacity: 0.2 })}
          />
        )}
      </Text>

      <Text
        variant="h7"
        css={{
          opacity: 0.5,
          margin: 0,
          marginTop: "-0.4em",
        }}
      >
        {label}
      </Text>
      <Line spacing={0.5} css={{ marginBottom: 0 }} />
    </div>
  );
};

export default Stat;
