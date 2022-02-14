import { CSSObject } from "@emotion/serialize";
import { FC, HTMLAttributes } from "react";
import Button from "../../Button";
import Chevron from "../../Icons/Chevron";
import Line from "../../Line";
import Text from "../../Text";

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    Pick<GQL.Product, "title"> {}

const ShopSoldOut: FC<Props> = ({ title, ...props }) => (
  <div {...props}>
    <Text component="h3" css={{ margin: 0 }}>
      {title}
    </Text>
    <Text
      variant="body2"
      css={{
        margin: 0,
        opacity: 0.5,
      }}
    >
      Sold out
    </Text>
    <Line spacing={3} />
    <Text>
      Leave your email and we will let you know when this deck is back in stock!
    </Text>
    <form
      css={(theme) => ({
        display: "flex",
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(2),
      })}
    >
      <input
        type="email"
        placeholder="Your email"
        css={(theme) => ({
          ...(theme.typography.body2 as CSSObject),
          paddingLeft: theme.spacing(2),
          height: theme.spacing(5),
          flexGrow: 1,
        })}
      />
      <Button
        type="submit"
        Icon={Chevron}
        iconProps={{
          css: (theme) => ({
            height: theme.spacing(2),
            width: theme.spacing(1.2),
          }),
        }}
      />
    </form>
  </div>
);

export default ShopSoldOut;
