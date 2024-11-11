import { css } from "@emotion/react";
import { FC, HTMLAttributes, useState } from "react";
import { breakpoints } from "../../../source/enums";
import AddToBagButton from "../../AddToBagButton";
import Bag from "../../Icons/Bag";
import { useSize } from "../../SizeProvider";
import StatBlock from "../../StatBlock";
import Text from "../../Text";

interface Props
  extends HTMLAttributes<HTMLElement>,
    Omit<GQL.Product, "title"> {
  isEurope: boolean;
}

const ShopItem: FC<Props> = ({
  image,
  image2,
  price,
  short,
  _id,
  isEurope,
  ...props
}) => {
  const [hovered, hover] = useState(false);
  const onMouseEnter = () => hover(true);
  const onMouseLeave = () => hover(false);
  const backgroundCss = css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "50% 0 no-repeat",
    backgroundSize: "90%",
  });

  const { width } = useSize();

  return (
    <StatBlock
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      css={(theme) => ({
        overflow: "hidden",
        position: "relative",
        transform: "translate3d(0, 0, 0)",
        backgroundColor: theme.colors.page_bg_light_gray,
      })}
    >
      {(short === "Zero" || short === "Future" || short === "Future II") && (
        <span
          css={(theme) => [
            {
              position: "absolute",
              top: 20,
              right: 20,
              color: theme.colors.text_subtitle_dark,
              borderRadius: 30,
              backgroundColor: theme.colors.white,
              padding: `${theme.spacing(0.8)}px ${theme.spacing(1.5)}px`,
              textTransform: "capitalize",
              fontWeight: 500,
              fontSize: 14,
              zIndex: 9,
              [theme.maxMQ.sm]: {
                fontSize: 12,
                top: 10,
                right: 10,
              },
            },
          ]}
        >
          Low stock
        </span>
      )}
      <div
        css={(theme) => [
          backgroundCss,
          {
            transition: theme.transitions.fast("opacity"),
            [theme.maxMQ.sm]: {
              aspectRatio: "1 / 1",
              backgroundSize: "contain",
              maxHeight: theme.spacing(34),
              // backgroundPosition: "center",
            },
          },
        ]}
        style={{
          backgroundImage: `url(${image2})`,
          backgroundColor: "#f5f5f5",
        }}
      />

      {width >= breakpoints.sm && (
        <div
          css={(theme) => [
            backgroundCss,
            {
              transition: theme.transitions.fast("opacity"),
              backgroundColor: theme.colors.white,
            },
          ]}
          style={{ backgroundImage: `url(${image})`, opacity: +hovered }}
        />
      )}

      {/* {(width >= breakpoints.md || width < breakpoints.sm) && ( */}
      <div
        css={(theme) => ({
          position: "relative",
          [theme.mq.sm]: {
            justifyContent: "space-between",
            // opacity: +hovered,
            alignItems: "flex-end",
          },
          [theme.maxMQ.sm]: {
            gap: theme.spacing(1.5),
            flexDirection: "column",
            justifyContent: "end",
            flexWrap: "wrap",
          },
          display: "flex",
          height: "100%",
          transition: theme.transitions.fast("opacity"),
        })}
      >
        <div>
          <Text
            variant={width >= breakpoints.sm ? "h4" : "h3"}
            css={(theme) => ({
              marginTop: 0,
              marginBottom: theme.spacing(1.5),
            })}
          >
            {short}
          </Text>
          <div css={{ alignItems: "center", display: "flex" }}>
            <AddToBagButton
              productId={_id}
              Icon={Bag}
              // {...(width < breakpoints.sm && { color: "black" })}
              color="black"
              css={(theme) => [
                {
                  [theme.mq.sm]: { alignSelf: "flex-end" },
                  width: "fit-content",
                },
              ]}
            >
              {width >= breakpoints.md ? "Add to bag" : "Add"}
            </AddToBagButton>
            {/* {width < breakpoints.sm && ( */}
            <Text
              variant="body4"
              css={(theme) => [
                {
                  opacity: 0.5,
                  margin: 0,
                  marginLeft: theme.spacing(1.5),
                  display: "inline",
                },
              ]}
            >
              {(isEurope ? price.eur : price.usd).toLocaleString(undefined, {
                style: "currency",
                currency: "EUR",
              })}
            </Text>
            {/* )} */}
          </div>
        </div>
      </div>
      {/* )} */}
    </StatBlock>
  );
};

export default ShopItem;
