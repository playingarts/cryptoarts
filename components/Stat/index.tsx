import { FC, HTMLAttributes } from "react";
import Eth from "../Icons/Eth";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  eth?: boolean;
}

const Stat: FC<Props> = ({ label, value, eth, ...props }) => {
  return (
    <div {...props}>
      <Text variant="h3" css={{ display: "flex", alignItems: "baseline" }}>
        {value}
        {eth && (
          <Eth
            css={(theme) => ({ marginLeft: theme.spacing(1), opacity: 0.2 })}
          />
        )}
      </Text>

      <Text
        variant="h6"
        css={{
          opacity: 0.5,
        }}
      >
        {label}
      </Text>
    </div>
  );
};

export default Stat;
