import { FC, HTMLAttributes } from "react";
import Text from "../../Text";

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    Pick<GQL.Product, "title"> {}

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
