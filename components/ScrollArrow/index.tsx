import throttle from "just-throttle";
import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import ThickChevron from "../Icons/ThickChevron";
import Link from "../Link";

const ScrollArrow: FC<HTMLAttributes<HTMLElement> & { scrollTo: string }> = ({
  scrollTo,
}) => {
  const [visible, setVisible] = useState(true);
  const { query } = useRouter();

  //todo: arrow disappear/appear
  useEffect(() => {
    const handler = throttle(() => {
      const element = document.querySelector(`[data-id='${scrollTo}']`);
      if (!element) {
        return;
      }
      if (element.getBoundingClientRect().top < 300) {
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
    <Link
      href={{
        query: {
          ...query,
          scrollIntoView: `[data-id='${scrollTo}']`,
          scrollIntoViewBehavior: "smooth",
          scrollIntoViewPosition: "start",
        },
      }}
      css={(theme) => [
        {
          "&:hover": {
            cursor: "pointer",
          },
          position: "fixed",
          left: 0,
          bottom: "0",
          // transform: "translateY(-50%) rotate(90deg)",
          height: theme.spacing(6),
          aspectRatio: "1",
          zIndex: 99999,
        },
      ]}
    >
      <ThickChevron
        css={(theme) => [
          {
            transform: "translateY(-50%) translateX(-50%) rotate(90deg)",
            position: "relative",
            top: "50%",
            left: "50%",
            color: theme.colors.text_subtitle_dark,
          },
        ]}
      />
    </Link>
  ) : null;
};

export default ScrollArrow;
