import { FC, HTMLAttributes } from "react";
import Grid from "../../../Grid";
import Text from "../../../Text";
import Spades from "../../../Icons/Suits/Spades";
import Clubs from "../../../Icons/Suits/Clubs";
import Diamonds from "../../../Icons/Suits/Diamonds";

const Trust: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <Grid
      css={(theme) => [
        {
          background: theme.colors.pale_gray,
          padding: "60px 0",
          "> *": {
            gridColumn: "span 3",
          },
        },
      ]}
      {...props}
    >
      <div>
        <Spades css={(theme) => [{ color: theme.colors.black30 }]} />
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ color: theme.colors.black50, marginTop: theme.spacing(3) }]}
        >
          Free shipping
          <br />
          for orders over $45!
        </Text>
      </div>

      <div>
        <Spades
          css={(theme) => [{ color: theme.colors.black30, rotate: "180deg" }]}
        />
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ color: theme.colors.black50, marginTop: theme.spacing(3) }]}
        >
          Hassle-free returns,
          <br />
          money-back guarantee
        </Text>
      </div>

      <div>
        <Clubs css={(theme) => [{ color: theme.colors.black30 }]} />
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ color: theme.colors.black50, marginTop: theme.spacing(3) }]}
        >
          Trusted by 10,000+
          <br />
          customers worldwide
        </Text>
      </div>

      <div>
        <Diamonds css={(theme) => [{ color: theme.colors.black30 }]} />
        <Text
          typography="paragraphSmall"
          css={(theme) => [{ color: theme.colors.black50, marginTop: theme.spacing(3) }]}
        >
          Secure payments,
          <br />
          worry-free checkout
        </Text>
      </div>
    </Grid>
  );
};

export default Trust;
