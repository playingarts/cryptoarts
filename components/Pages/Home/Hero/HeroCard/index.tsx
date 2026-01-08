import Card from "../../../../Card";
import { useSize } from "../../../../SizeProvider";
import { breakpoints } from "../../../../../source/enums";
import { FC, ReactNode } from "react";
import { useHeroCarousel } from "../../../../../contexts/heroCarouselContext";

const HeroCard: FC = () => {
  const { width } = useSize();
  const { currentCard, advance, setHovering } = useHeroCarousel();

  // Don't render until we have a card
  if (!currentCard) {
    return null;
  }

  // Create a mock card object for the Card component
  const cardForDisplay = {
    _id: currentCard._id,
    img: currentCard.img,
    cardBackground: currentCard.cardBackground,
  } as unknown as GQL.Card;

  return (
    <div
      css={[
        {
          position: "relative",
          "> *": {
            // boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.10)",
          },
          ">:nth-child(2)": { transform: "rotate(5deg)" },
          ">:nth-child(1)": { transform: "rotate(-12deg)" },
          ">:not(:last-child)": {
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
          },
        },
      ]}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Background decorative cards - using same image for visual effect */}
      {[0, 1].map((i) => (
        <Card
          key={`HeroCardBg${i}`}
          size={width >= breakpoints.sm ? "big" : "nano"}
          noArtist
          card={cardForDisplay}
        />
      ))}
      {/* Main interactive card */}
      <Card
        key={"HeroCard" + currentCard._id}
        size={width >= breakpoints.sm ? "big" : "nano"}
        noArtist
        card={cardForDisplay}
        noFavorite
        onClick={advance}
      />
    </div>
  );
};

export default HeroCard;
