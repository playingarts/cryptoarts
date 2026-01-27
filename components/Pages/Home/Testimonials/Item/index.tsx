import { FC, HTMLAttributes, ReactNode } from "react";
import Rating from "../../../../Icons/Rating";
import Text from "../../../../Text";
import Dot from "../../../../Icons/Dot";
import Link from "../../../../Link";
import { useSize } from "../../../../SizeProvider";
import { breakpoints } from "../../../../../source/enums";

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
  HTMLAttributes<HTMLElement> & { rating: GQL.Rating; customButton?: ReactNode; currentDeckSlug?: string; hideBought?: boolean }
> = ({ rating, customButton, currentDeckSlug, hideBought = false, ...props }) => {
  const { width } = useSize();
  const isMobile = width < breakpoints.xsm;
  const charCount = rating.review.length;

  // Typography based on character count
  const getTypography = () => {
    if (charCount <= 30) return isMobile ? "h2" : "h1";
    if (charCount <= 120) return isMobile ? "p" : "p-l";
    return isMobile ? "p-m" : "p";
  };

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
          padding: theme.spacing(3),
          paddingRight: 60,
          borderRadius: theme.spacing(2),
          background: theme.colors.soft_gray,
          width: 520,
          minWidth: 520,
          maxWidth: 520,
          flexShrink: 0,
          scrollSnapAlign: "start",
          [theme.maxMQ.xsm]: {
            width: 300,
            minWidth: 300,
            maxWidth: 300,
            paddingRight: theme.spacing(3),
          },
          ...(!hideBought && {
            [theme.mq.xsm]: {
              "&:hover .customer-name": {
                opacity: 0,
              },
              "&:hover .deck-titles": {
                opacity: 1,
              },
            },
          }),
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
        css={(theme) => [{ marginTop: theme.spacing(3) }]}
        typography={getTypography()}
      >
        "{rating.review}"
      </Text>
      <div css={(theme) => ({ position: "relative", marginTop: theme.spacing(2), height: 27 })}>
        <Text
          className="customer-name"
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "opacity 0.2s ease",
          }}
          typography="p-s"
        >
          {rating.who}
        </Text>
        {!hideBought && (
          <div
            className="deck-titles"
            css={(theme) => ({
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              ...theme.typography["p-s"],
              display: "flex",
              alignItems: "center",
              gap: 4,
              opacity: 0,
              transition: "opacity 0.2s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            })}
          >
            <span css={(theme) => ({ color: theme.colors.black })}>Bought:</span>{" "}
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
