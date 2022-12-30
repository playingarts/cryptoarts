import { FC, HTMLAttributes } from "react";
import Line from "../../Line";
import Link from "../../Link";
import Button from "../../Button";
import Text from "../../Text";

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    Pick<GQL.Product, "title"> {}
    
const newsletterLink = process.env.NEXT_PUBLIC_NEWSLETTER;
const ShopSoldOut: FC<Props> = ({ title, ...props }) => {
  return (
    <div {...props}>
      <Text component="h3" css={{ margin: 0 }}>
        {title}
      </Text>
      <Text
        variant="body2"
        css={(theme) => [
          {
            margin: 0,
            opacity: 0.5,
            marginTop: theme.spacing(1),
          },
        ]}
      >
        Sold out
      </Text>
      <Line
        spacing={2.5}
        css={[
          {
            width: "100%",
            gridColumn: "1/-1",
          },
        ]}
      />
      <Button
        color="black"
        component={Link}
        href={newsletterLink}
        target="_blank"
      >
        Subscribe to project news
      </Button>
      <Text
        variant="body0"
        css={[
          {
            color: "rgba(0, 0, 0, 0.5)",
            lineHeight: "25px",
          },
        ]}
      >
        We will let you know when this deck is back in stock. Unsubscribe at anytime!
      </Text>
      {/* <Line
        spacing={width < breakpoints.sm ? 1 : 3}
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              marginTop: theme.spacing(2),
            },
          },
        ]}
      />
      <Text
        css={(theme) => [
          {
            [theme.maxMQ.sm]: {
              fontSize: 16,
            },
          },
        ]}
      >
        Leave your email and we will let you know when this deck is back in
        stock!
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
      </form> */}
    </div>
  );
};

export default ShopSoldOut;
