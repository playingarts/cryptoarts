import { FC, HTMLAttributes, ReactNode } from "react";
import Rating from "../../../../Icons/Rating";
import Text from "../../../../Text";
import Dot from "../../../../Icons/Dot";

const Item: FC<
  HTMLAttributes<HTMLElement> & { rating: GQL.Rating; customButton?: ReactNode }
> = ({ rating, customButton, ...props }) => {
  const charCount = rating.review.length;

  return (
    <div
      css={(theme) => [
        {
          padding: 30,
          paddingRight: 60,
          borderRadius: 20,
          background: theme.colors.soft_gray,
          width: 520,
          minWidth: 520,
          maxWidth: 520,
          flexShrink: 0,
          scrollSnapAlign: "start",
        },
      ]}
      {...props}
    >
      <span>
        <Rating />
        <Rating />
        <Rating />
        <Rating />
        <Rating />
      </span>
      <Text
        css={[{ marginTop: 30 }]}
        typography={
          charCount <= 30
            ? "newh2"
            : charCount <= 120
            ? "paragraphBig"
            : "paragraphSmall"
        }
      >
        “{rating.review}”
      </Text>
      <Text css={[{ marginTop: 15 }]} typography="paragraphSmall">
        {rating.who}
      </Text>

      {customButton ?? (
        <Text typography="linkNewTypography" css={[{ marginTop: 15 }]}>
          {rating.title} <Dot />
        </Text>
      )}
    </div>
  );
};

export default Item;
