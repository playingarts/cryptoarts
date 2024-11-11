import { FC, HTMLAttributes, MouseEventHandler } from "react";
import { breakpoints } from "../../../source/enums";
import Cross from "../../Icons/Cross";
import SelectButton, { Props as SelectButtonProps } from "../../SelectButton";
import { useSize } from "../../SizeProvider";
import Text from "../../Text";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  price?: number;
  image?: string;
  info?: string | JSX.Element;
  info2?: string | JSX.Element;
  quantity?: number;
  titleVariant?: "h4" | "h5";
  priceVariant?: "h4" | "h5";
  changeQuantity?: SelectButtonProps["setter"];
  remove?: MouseEventHandler<HTMLElement>;
  withoutPic?: boolean;
  withoutSelect?: boolean;
  isEurope: boolean;
}

const ShopCheckoutItem: FC<Props> = ({
  image,
  title,
  info,
  info2,
  quantity,
  price,
  titleVariant,
  priceVariant = "h5",
  changeQuantity,
  remove,
  withoutPic,
  isEurope,
  ...props
}) => {
  const options = Array.from(
    {
      length: !quantity || quantity < 4 ? 4 : quantity + 1,
    },
    (_, i) => i
  ).filter((i) => !!i);

  const { width } = useSize();

  return (
    <div
      {...props}
      css={(theme) => [
        {
          display: "flex",
          width: "100%",
          alignItems: "center",
          [theme.maxMQ.sm]: {
            flexWrap: "wrap",
            display: "inline-flex",
          },
        },
      ]}
    >
      {!withoutPic && (
        <div
          css={(theme) => ({
            width: theme.spacing(18),
            backgroundSize: "contain",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            [theme.mq.sm]: {
              marginRight: theme.spacing(3),
              height: theme.spacing(15),
            },
            [theme.maxMQ.sm]: {
              order: 0,
              flexBasis: "63%",
              flexGrow: 1,
              backgroundPosition: "0% 50%",
              height: theme.spacing(17),
              backgroundSize: "contain",
            },
            flexShrink: 0,
            ...(image && {
              backgroundImage: `url(${image})`,
            }),
          })}
        />
      )}
      <div
        css={(theme) => [
          {
            flexGrow: 1,
            [theme.maxMQ.sm]: {
              order: 3,
              flexBasis: "50%",
              // marginBottom: theme.spacing(1),
            },
          },
        ]}
      >
        <Text
          // component="h3"
          css={[{ margin: 0 }]}
          {...(titleVariant
            ? { component: titleVariant }
            : {
                component: width >= breakpoints.sm ? "h4" : "h3",
              })}
        >
          {title}
        </Text>
        <div
          css={(theme) => ({
            marginTop: theme.spacing(0.5),
          })}
        >
          {typeof info === "string" ? (
            <Text
              variant="label"
              css={{ fontWeight: 400, margin: 0, opacity: 0.5 }}
            >
              {info}
            </Text>
          ) : (
            info
          )}
        </div>
      </div>
      {quantity !== undefined && (
        <div
          css={(theme) => ({
            height: "calc(50% + var(--buttonHeight)/2)",

            [theme.mq.sm]: {
              marginLeft: theme.spacing(3),
            },
            [theme.maxMQ.sm]: {
              alignSelf: "end",
              order: 4,
              maxHeight: "var(--buttonHeight)",
            },
            // paddingTop: "50%",
            // ...{ visibility: "hidden" },
          })}
        >
          {remove && width < breakpoints.sm && (
            <Text
              component="button"
              css={(theme) => [
                {
                  opacity: 0.2,
                  marginTop: 0,
                  color: theme.colors.black + "!important",
                  marginRight: theme.spacing(1),
                },
              ]}
              onClick={remove}
            >
              <Cross />
            </Text>
          )}
          <SelectButton
            keepOrder={true}
            value={quantity}
            setter={changeQuantity}
            states={options.map((option) => ({ children: option }))}
            css={(theme) => [
              {
                display: "inline-block",
                // maxHeight: "100%",
                // maxHeight: "calc(var(--buttonHeight)*6)",
                // overflowY: "scroll",
                overflow: "visible",
                width: theme.spacing(8),
                marginRight: 20,
                [theme.maxMQ.sm]: {
                  // maxHeight: "calc(var(--buttonHeight)*2.5)",
                  // width: theme.spacing(10),
                  marginRight: 0,
                },
              },
            ]}
          />
        </div>
      )}
      {(price || remove) && (
        <div
          css={(theme) => ({
            [theme.mq.sm]: {
              width: theme.spacing(18),
              marginLeft: theme.spacing(3),
            },
            flexShrink: 0,
            [theme.maxMQ.sm]: {
              order: 1,
              // flexBasis: "37%",
            },
          })}
        >
          {price && (
            <Text
              variant={priceVariant}
              css={(theme) => ({
                marginTop: 10,
                marginBottom: 0,
                fontSize: 30,
                [theme.maxMQ.sm]: {
                  fontSize: 25,
                },
              })}
            >
              {price.toLocaleString(undefined, {
                style: "currency",
                currency: isEurope ? "EUR" : "USD",
              })}
            </Text>
          )}
          {remove && width >= breakpoints.sm && (
            <Text
              component="button"
              css={(theme) => ({
                transition: theme.transitions.slow("opacity"),
                opacity: 0.5,
                "&:hover": {
                  opacity: 1,
                },
              })}
              onClick={remove}
            >
              Remove
            </Text>
          )}
          <div css={(theme) => ({ marginTop: theme.spacing(0.7) })}>
            {typeof info2 === "string" ? (
              <Text css={{ opacity: 0.5 }}>{info2}</Text>
            ) : (
              info2
            )}
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default ShopCheckoutItem;
