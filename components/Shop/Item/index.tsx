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
    Omit<GQL.Product, "title"> {}

const ShopItem: FC<Props> = ({
  image,
  image2,
  price,
  short,
  _id,
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
    background: "50% 50% no-repeat",
    backgroundSize: "cover",
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
      <div
        css={(theme) => [
          backgroundCss,
          {
            transition: theme.transitions.fast("opacity"),
            [theme.maxMQ.sm]: {
              height: theme.spacing(34),
              // minWidth: theme.spacing(40.8),
              aspectRatio: "1 / 1",
              // backgroundSize: "130%",
              backgroundSize: "contain",
              maxHeight: theme.spacing(34),
              // margin: "0 auto",
              backgroundPosition: "center",
              // backgroundPositionY: "-50px",
            },
          },
        ]}
        style={{ backgroundImage: `url(${image})` }}
      />
      {width >= breakpoints.sm && (
        <div
          css={(theme) => [
            backgroundCss,
            {
              transition: theme.transitions.fast("opacity"),
            },
          ]}
          style={{ backgroundImage: `url(${image2})`, opacity: +hovered }}
        />
      )}

      {(width >= breakpoints.md || width < breakpoints.sm) && (
        <div
          css={(theme) => ({
            position: "relative",
            [theme.mq.sm]: {
              justifyContent: "space-between",
              opacity: +hovered,
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
            <Text component="h3" css={{ margin: 0 }}>
              {short}
            </Text>
            {width >= breakpoints.sm && (
              <Text
                variant="body4"
                css={[
                  {
                    opacity: 0.5,
                    margin: 0,
                  },
                ]}
              >
                {price.toLocaleString(undefined, {
                  style: "currency",
                  currency: "EUR",
                })}
              </Text>
            )}
          </div>
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
              {width >= breakpoints.sm ? "Add to bag" : "Add"}
            </AddToBagButton>
            {width < breakpoints.sm && (
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
                {price.toLocaleString(undefined, {
                  style: "currency",
                  currency: "EUR",
                })}
              </Text>
            )}
          </div>
        </div>
      )}
    </StatBlock>
  );
};

export default ShopItem;
