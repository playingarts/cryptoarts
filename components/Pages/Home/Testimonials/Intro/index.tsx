import { FC, HTMLAttributes, RefObject } from "react";
import ButtonTemplate from "../../../../Buttons/Button";
import Arrow from "../../../../Icons/Arrow";
import NewIntro from "../../../../Intro";

const Intro: FC<
  HTMLAttributes<HTMLElement> & {
    leftArrowRef: RefObject<HTMLButtonElement | null>;
    rightArrowRef: RefObject<HTMLButtonElement | null>;
    onScrollLeft: () => void;
    onScrollRight: () => void;
  }
> = ({ leftArrowRef, rightArrowRef, onScrollLeft, onScrollRight }) => (
  <NewIntro
    arrowedText="1,000+ Five-of-Stars reviews"
    paragraphText="Discover why collectors, players and art connoisseurs can't get enough."
    linkNewText="Read all stories"
    bottom={
      <div
        css={(theme) => ({
          display: "flex",
          gap: 5,
          marginTop: theme.spacing(12),
          [theme.maxMQ.xsm]: {
            marginTop: theme.spacing(3),
          },
        })}
      >
        <button
          ref={leftArrowRef}
          type="button"
          aria-label="Previous review"
          onClick={onScrollLeft}
          css={(theme) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 45,
            height: 45,
            background: "white",
            color: theme.colors.dark_gray,
            borderRadius: "100%",
            border: "none",
            transform: "rotate(180deg)",
            userSelect: "none",
            transition: "opacity 0.2s, background 0.2s, color 0.2s",
            cursor: "pointer",
            "&:hover": {
              background: theme.colors.dark_gray,
              color: "white",
            },
          })}
        >
          <Arrow />
        </button>
        <button
          ref={rightArrowRef}
          type="button"
          aria-label="Next review"
          onClick={onScrollRight}
          css={(theme) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 45,
            height: 45,
            background: "white",
            color: theme.colors.dark_gray,
            borderRadius: "100%",
            border: "none",
            userSelect: "none",
            transition: "opacity 0.2s, background 0.2s, color 0.2s",
            cursor: "pointer",
            "&:hover": {
              background: theme.colors.dark_gray,
              color: "white",
            },
          })}
        >
          <Arrow />
        </button>
      </div>
    }
    beforeLinkNew={
      <ButtonTemplate
        bordered={true}
        size="small"
        css={{ "&:hover": { cursor: "default" } }}
      >
        Leave a review
      </ButtonTemplate>
    }
  />
);

export default Intro;
