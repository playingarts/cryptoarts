import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const ScrollIntoView: FC = () => {
  const {
    query: {
      scrollIntoView,
      scrollIntoViewBehavior,
      scrollIntoViewPosition,
      ...query
    },
    replace,
  } = useRouter();

  useEffect(() => {
    if (!scrollIntoView) {
      return;
    }

    const element = document.querySelector(
      scrollIntoView instanceof Array ? scrollIntoView[0] : scrollIntoView
    );

    if (element) {
      replace({ query }, undefined, {
        scroll: false,
        shallow: true,
      });

      return () => {
        element.scrollIntoView({
          behavior:
            scrollIntoViewBehavior === "smooth"
              ? scrollIntoViewBehavior
              : "auto",
          block: (scrollIntoViewPosition as ScrollLogicalPosition) || "center",
        });
      };
    }
  }, [query, replace, scrollIntoView, scrollIntoViewBehavior]);

  return null;
};

export default ScrollIntoView;
