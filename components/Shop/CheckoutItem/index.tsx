import { FC, HTMLAttributes, MouseEventHandler } from "react";
import Select, { Props as SelectProps } from "../../Select";
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

  return (
    <div {...props} css={{ display: "flex", alignItems: "center" }}>
      <div
        css={(theme) => ({
          width: theme.spacing(18),
          backgroundSize: "contain",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          marginRight: theme.spacing(3),
          flexShrink: 0,
          ...(image && {
            backgroundImage: `url(${image})`,
            height: theme.spacing(15),
          }),
        })}
      />
      <div
        css={{
          display: "flex",
          alignItems: "baseline",
          flexGrow: 1,
        }}
      >
        <div css={{ flexGrow: 1 }}>
          <Text css={{ margin: 0 }} variant={titleVariant}>
            {title}
          </Text>

          <div css={(theme) => ({ marginTop: theme.spacing(0.5) })}>
            {typeof info === "string" ? (
              <Text css={{ margin: 0, opacity: 0.5 }}>{info}</Text>
            ) : (
              info
            )}
          </div>
        </div>
        <div
          css={(theme) => ({
            marginLeft: theme.spacing(3),
            ...(quantity === undefined && { visibility: "hidden" }),
          })}
        >
          <Select
            value={quantity}
            onChange={changeQuantity}
            options={options}
            align="right"
          />
        </div>
        <div
          css={(theme) => ({
            width: theme.spacing(18),
            marginLeft: theme.spacing(3),
            flexShrink: 0,
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
          {remove && (
            <Text
              component="button"
              css={{ opacity: 0.5, marginTop: 7 }}
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
      </div>
    </div>
  );
};

export default ShopCheckoutItem;
