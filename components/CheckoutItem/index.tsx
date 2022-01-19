import { CSSObject } from "@emotion/serialize";
import {
  ChangeEventHandler,
  FC,
  HTMLAttributes,
  MouseEventHandler,
} from "react";
import Chevron from "../Icons/Chevron";
import Text from "../Text";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  price: number;
  image?: string;
  info?: string | JSX.Element;
  info2?: string;
  quantity?: number;
  titleVariant?: "h4" | "h5";
  priceVariant?: "h4" | "h5";
  changeQuantity?: ChangeEventHandler<HTMLSelectElement>;
  remove?: MouseEventHandler<HTMLElement>;
}

const CheckoutItem: FC<Props> = ({
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
          <div
            css={{
              position: "relative",
            }}
          >
            <Chevron
              css={(theme) => ({
                width: theme.spacing(0.8),
                height: theme.spacing(1.2),
                transform: "rotate(90deg) translate(-100%, 0)",
                position: "absolute",
                right: theme.spacing(1.1),
                top: "50%",
              })}
            />
            <select
              css={(theme) => ({
                border: 0,
                backgroundColor: "unset",
                appearance: "none",
                paddingRight: theme.spacing(3),
                paddingLeft: theme.spacing(3),
                position: "relative",
                textAlign: "right",
                direction: "rtl",
                ...(theme.typography.h5 as CSSObject),
              })}
              value={quantity}
              onChange={changeQuantity}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          css={(theme) => ({
            width: theme.spacing(18),
            marginLeft: theme.spacing(3),
            flexShrink: 0,
          })}
        >
          <Text variant={priceVariant} css={{ margin: 0 }}>
            €{price.toFixed(2)}
          </Text>
          {remove && (
            <Text
              component="button"
              css={{ opacity: 0.5, marginTop: 7 }}
              onClick={remove}
            >
              Remove
            </Text>
          )}
          {info2 && <Text css={{ opacity: 0.5, marginTop: 7 }}>{info2}</Text>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
