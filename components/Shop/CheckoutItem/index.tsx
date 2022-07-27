import { FC, HTMLAttributes, MouseEventHandler } from "react";
import { breakpoints } from "../../../source/enums";
import Cross from "../../Icons/Cross";
import Select, { Props as SelectProps } from "../../Select";
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
  changeQuantity?: SelectProps["onChange"];
  remove?: MouseEventHandler<HTMLElement>;
  withoutPic?: boolean;
  withoutSelect?: boolean;
}

const ShopCheckoutItem: FC<Props> = ({
  image,
  title,
  info,
  info2,
  quantity,
  price,
  titleVariant = "h4",
  priceVariant = "h5",
  changeQuantity,
  remove,
  withoutPic,
  ...props
}) => {
  const options: SelectProps["options"] = Array.from({
    length: !quantity || quantity < 10 ? 10 : quantity,
  }).reduce<SelectProps["options"]>(
    (options, _, index) => ({
      ...options,
      [index + 1]: index + 1,
    }),
    {}
  );

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
              // aspectRatio: "1.9",
              // height: "calc(100%)",
              // width: "100%",
              // position: "relative",
              height: theme.spacing(18),
              marginBottom: theme.spacing(1),
              backgroundSize: "contain",
            },
            flexShrink: 0,
            ...(image && {
              backgroundImage: `url(${image})`,
            }),
          })}
        />
      )}
      {/* <div
        css={{
          display: "flex",
          alignItems: "baseline",
          flexGrow: 1,
        }}
      > */}
      <div
        css={(theme) => [
          {
            flexGrow: 1,
            // minWidth: "max-content",
            [theme.maxMQ.sm]: {
              order: 3,
              flexBasis: "50%",
              marginBottom: theme.spacing(1),
            },
          },
        ]}
      >
        <Text
          css={[{ margin: 0 }]}
          {...(width >= breakpoints.sm
            ? { variant: titleVariant }
            : {
                component: "h3",
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
            [theme.maxMQ.sm]: {
              order: 4,
            },
            marginLeft: theme.spacing(3),
            // ...{ visibility: "hidden" },
          })}
        >
          {remove && width < breakpoints.sm && (
            <Text
              component="button"
              css={(theme) => [
                {
                  opacity: 0.2,
                  marginTop: 7,
                  color: theme.colors.black + "!important",
                },
              ]}
              onClick={remove}
            >
              <Cross />
            </Text>
          )}
          <Select
            value={quantity}
            onChange={changeQuantity}
            options={options}
            align="right"
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
            <Text variant={priceVariant} css={{ margin: 0 }}>
              {price.toLocaleString(undefined, {
                style: "currency",
                currency: "EUR",
              })}
            </Text>
          )}
          {remove && width >= breakpoints.sm && (
            <Text
              component="button"
              css={[
                {
                  opacity: 0.5,
                  marginTop: 7,
                },
              ]}
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
