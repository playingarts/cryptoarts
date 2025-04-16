import { FC, HTMLAttributes, RefObject } from "react";
import ButtonTemplate from "../../../../Buttons/Button";
import Arrow from "../../../../Icons/Arrow";
import NewIntro from "../../../../Intro";

const Intro: FC<
  HTMLAttributes<HTMLElement> & {
    carouselRef: RefObject<HTMLDivElement | null>;
  }
> = ({ carouselRef }) => (
  <NewIntro
    arrowedText="1,000+ Five-of-Stars reviews"
    paragraphText="Discover why collectors, players and art connoisseurs can’t get enough."
    linkNewText="Read all stories"
    bottom={
      <div
        css={[
          {
            display: "flex",
            gap: 5,
            marginTop: 120,
            "> *": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 45,
              height: 45,
              background: "white",
              borderRadius: "100%",
            },
          },
        ]}
      >
        <div
          css={(theme) => [
            {
              transform: "rotate(180deg)",
              userSelect: "none",
              "&:hover": {
                cursor: "pointer",
                background: theme.colors.dark_gray,
                color: "white",
              },
            },
          ]}
          onClick={() => {
            carouselRef.current &&
              carouselRef.current.scrollBy({
                behavior: "smooth",
                left: -580,
              });
          }}
        >
          <Arrow />
        </div>
        <div
          css={(theme) => [
            {
              userSelect: "none",
              "&:hover": {
                cursor: "pointer",
                background: theme.colors.dark_gray,
                color: "white",
              },
            },
          ]}
          onClick={() => {
            carouselRef.current &&
              carouselRef.current.scrollBy({
                behavior: "smooth",
                left: 580,
              });
          }}
        >
          <Arrow />
        </div>
      </div>
    }
    beforeLinkNew={
      <ButtonTemplate bordered={true} size="small">
        Leave a review
      </ButtonTemplate>
    }
  />
);

export default Intro;
