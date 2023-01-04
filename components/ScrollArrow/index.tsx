import throttle from "just-throttle";
import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import ThickChevron from "../Icons/ThickChevron";
import Link from "../Link";

const ScrollArrow: FC<HTMLAttributes<HTMLElement> & { scrollTo: string }> = ({
  scrollTo,
}) => {
  const [visible, setVisible] = useState(true);
  const {
    query: { deckId, ...query },
  } = useRouter();

  //todo: arrow disappear/appear
  useEffect(() => {
    const handler = throttle(() => {
      const element = document.querySelector(`[data-id='${scrollTo}']`);
      if (!element) {
        return;
      }

      if (element.getBoundingClientRect().top + 150 < window.innerHeight) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }, 10);
    handler();

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [scrollTo, query]);

  return visible ? (
    <div
      css={(theme) => [
        {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: theme.spacing(6),
          zIndex: 99999,
          pointerEvents: "none",
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            height: "100%",
            position: "relative",
            maxWidth: theme.spacing(123),
            width: "100%",
            margin: "0 auto",
          },
        ]}
      >
        <Link
          href={{
            query: {
              ...query,
              deckId,
              scrollIntoView: `[data-id='${scrollTo}']`,
              scrollIntoViewBehavior: "smooth",
              scrollIntoViewPosition: "start",
            },
          }}
          css={[
            {
              "&:hover": {
                cursor: "pointer",
              },
              position: "absolute",
              left: 0,
              bottom: "0",
              // transform: "translateY(-50%) rotate(90deg)",
              aspectRatio: "1",
              zIndex: 99999,
              height: "100%",
            },
          ]}
        >
          <ThickChevron
            css={(theme) => [
              {
                pointerEvents: "initial",
                transform: "translateY(-50%) translateX(-50%) rotate(90deg)",
                position: "relative",
                top: "50%",
                left: "50%",
                opacity: .5,
                transition: theme.transitions.slow("opacity"),
                color:
                  deckId === "crypto"
                    ? theme.colors.text_subtitle_light
                    : theme.colors.text_subtitle_dark,
                  "&:hover": {
                    opacity: 1,
                  },
              },
            ]}
          />
        </Link>
      </div>
    </div>
  ) : null;
};

export default ScrollArrow;
