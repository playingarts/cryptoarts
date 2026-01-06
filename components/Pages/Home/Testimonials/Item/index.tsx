import { FC, HTMLAttributes, ReactNode } from "react";
import Rating from "../../../../Icons/Rating";
import Text from "../../../../Text";
import Dot from "../../../../Icons/Dot";

const Item: FC<
  HTMLAttributes<HTMLElement> & { rating: GQL.Rating; customButton?: ReactNode }
> = ({ rating, customButton, ...props }) => {
  const reviewLength = rating.review.split(" ").length;

  return (
    <div
      css={(theme) => [
        {
          padding: 30,
          paddingRight: 60,
          borderRadius: 20,
          background: theme.colors.soft_gray,
          height: "fit-content",
          width: 520,
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
          reviewLength <= 2
            ? "newh2"
            : reviewLength <= 15
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
