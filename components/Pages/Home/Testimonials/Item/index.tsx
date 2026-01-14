import { FC, HTMLAttributes, ReactNode } from "react";
import Rating from "../../../../Icons/Rating";
import Text from "../../../../Text";
import Dot from "../../../../Icons/Dot";
import Link from "../../../../Link";

// Map deck slugs to display titles
const slugToTitle: Record<string, string> = {
  one: "Edition One",
  two: "Edition Two",
  three: "Edition Three",
  special: "Special Edition",
  crypto: "Crypto Edition",
  zero: "Edition Zero",
};

const Item: FC<
  HTMLAttributes<HTMLElement> & { rating: GQL.Rating; customButton?: ReactNode; currentDeckSlug?: string }
> = ({ rating, customButton, currentDeckSlug, ...props }) => {
  const charCount = rating.review.length;

  // Get sorted deck slugs (current deck first when on a filtered page)
  const sortedSlugs = rating.deckSlugs?.length
    ? [...rating.deckSlugs].sort((a, b) => {
        if (a === currentDeckSlug) return -1;
        if (b === currentDeckSlug) return 1;
        return 0;
      })
    : [];

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
          "&:hover .customer-name": {
            opacity: 0,
          },
          "&:hover .deck-titles": {
            opacity: 1,
          },
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
        "{rating.review}"
      </Text>
      <div css={{ position: "relative", marginTop: 15, height: 27 }}>
        <Text
          className="customer-name"
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            transition: "opacity 0.2s ease",
          }}
          typography="paragraphSmall"
        >
          {rating.who}
        </Text>
        {!customButton && (
          <div
            className="deck-titles"
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              fontSize: 18,
              lineHeight: "150%",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 4,
              opacity: 0,
              transition: "opacity 0.2s ease",
            }}
          >
            <span css={{ color: "#333" }}>Bought:</span>{" "}
            {sortedSlugs.length > 0
              ? sortedSlugs.map((slug, i) => (
                  <span key={slug}>
                    <Link href={`/${slug}`}>{slugToTitle[slug] || slug}</Link>
                    {i < sortedSlugs.length - 1 && ", "}
                  </span>
                ))
              : rating.title}
            <Dot css={{ marginLeft: 4 }} />
          </div>
        )}
      </div>
      {customButton}
    </div>
  );
};

export default Item;
