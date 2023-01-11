import { FC, HTMLAttributes } from "react";
import { breakpoints } from "../../../source/enums";
import AddToBagButton from "../../AddToBagButton";
import Bag from "../../Icons/Bag";
import Line from "../../Line";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";

interface Props
  extends Omit<HTMLAttributes<HTMLElement>, "title">,
    GQL.Product {}

const ShopBundle: FC<Props> = ({ title, price, image, _id, ...props }) => {
  const { width } = useSize();
  return (
    <div
      {...props}
      css={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        position: "relative",
        justifyContent: "end",
      }}
    >
      <div
        css={(theme) => ({
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          // backgroundPosition: "50% 50%",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          // aspectRatio: "495/400",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          [theme.maxMQ.sm]: {
            maxHeight: theme.spacing(26.6),
            aspectRatio: "1/1",
          },
          minHeight: theme.spacing(10),
        })}
      />
      <div
        css={(theme) => [
          {
            display: "flex",
            flexWrap: "wrap",
            [theme.maxMQ.sm]: {
              paddingLeft: theme.spacing(1.5),
              paddingRight: theme.spacing(1.5),
            },
          },
        ]}
      >
        {width >= breakpoints.sm && (
          <Line
            spacing={3}
            css={[
              {
                width: "100%",
              },
            ]}
          />
        )}
        <Text
          component={width < breakpoints.sm ? "h3" : "h4"}
          css={(theme) => [
            {
              margin: 0,
              width: "100%",
              marginBottom: theme.spacing(2),
              [theme.maxMQ.sm]: {
                order: 0,
                marginBottom: theme.spacing(1.5),
              },
            },
          ]}
        >
          {title}
        </Text>

        <Text
          variant="body4"
          css={(theme) => [
            {
              margin: 0,
              opacity: 0.5,
              order: 3,
              display: "inline",
              alignSelf: "center",
              marginLeft: theme.spacing(1.5),
            },
          ]}
        >
          €{price.toFixed(2)}
        </Text>
        <AddToBagButton
          productId={_id}
          Icon={Bag}
          color="black"
          css={(theme) => [
            {
              [theme.mq.sm]: { alignSelf: "flex-end" },
              width: "fit-content",
            },
          ]}
        >
          {width >= breakpoints.sm ? "Add to bag" : "Add"}
        </AddToBagButton>
      </div>
    </div>
  );
};

export default ShopBundle;
