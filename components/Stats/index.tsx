import { FC, HTMLAttributes } from "react";
import Arrowed from "../Arrowed";
import Box from "../Box";
import Line from "../Line";
import Link from "../Link";
import Stat from "../Stat";
import Text from "../Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  totalHolders: string | number;
  totalVolume: string | number;
  floorPrice: string | number;
  allLink: string;
}

const Stats: FC<Props> = ({
  totalHolders,
  totalVolume,
  floorPrice,
  allLink,
  ...props
}) => {
  return (
    <Box narrow={true} {...props}>
      <Text
        component="h6"
        css={{
          opacity: 0.5,
          margin: 0,
        }}
      >
        Stats
      </Text>

      <Stat
        label="Total holders"
        value={totalHolders}
        css={(theme) => ({ marginTop: theme.spacing(2) })}
      />
      <Line spacing={0.5} />
      <Stat
        label="Total volume"
        value={totalVolume}
        eth={true}
        css={(theme) => ({ marginTop: theme.spacing(4) })}
      />
      <Line spacing={0.5} />
      <Stat
        label="Current floor price"
        value={floorPrice}
        eth={true}
        css={(theme) => ({ marginTop: theme.spacing(4) })}
      />
      <Line spacing={0.5} />

      <Text
        component={Link}
        href={allLink}
        variant="label"
        css={(theme) => ({
          color: "currentcolor",
          opacity: 0.5,
          marginTop: theme.spacing(2.5),
          display: "inline-block",
        })}
      >
        <Arrowed>All stats</Arrowed>
      </Text>
    </Box>
  );
};

export default Stats;
