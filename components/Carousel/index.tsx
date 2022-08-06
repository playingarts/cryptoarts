import { FC, HTMLAttributes, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { theme } from "../../pages/_app";

export interface Props extends HTMLAttributes<HTMLElement> {
  index: number;
  items: (JSX.Element | null)[];
  onIndexChange: (offset: number) => void;
  width: number;
  columnGap?: number;
  noDots?: boolean;
}

const Carousel: FC<Props> = ({
  index,
  width,
  items,
  onIndexChange,
  noDots,
  columnGap = theme.spacing(3),
  ...props
}) => {
  // const width = theme.spacing(39);
  // const columnGap = theme.spacing(3);
  const ref = useRef<HTMLUListElement>(null);
  const handlers = useSwipeable({
    onSwipeStart: () => {
      if (!ref.current) {
        return;
      }

      ref.current.style.transition = "none";
    },
    onSwiped: ({ absX, deltaX, velocity }) => {
      if (!ref.current) {
        return;
      }

      ref.current.style.transition = theme.transitions.fast("left");
      ref.current.style.left = `${-(index * (width + columnGap))}px`;

      if (width / 10 < absX) {
        const offset =
          Math.floor(
            (velocity < 1
              ? absX - width / 10
              : velocity * 2 * absX - width / 10) / width
          ) + 1;

        onIndexChange(deltaX < 0 ? offset : -offset);
      }
    },
    onSwiping: ({ deltaX, first }) => {
      if (!ref.current || first) {
        return;
      }

      ref.current.style.left = `${-(index * (width + columnGap)) + deltaX}px`;
    },
    trackMouse: true,
  });

  return (
    <div
      {...props}
      {...handlers}
      css={(theme) => ({
        borderRadius: theme.spacing(2),
      })}
    >
      <ul
        css={(theme) => [
          {
            display: "flex",
            height: "100%",
            padding: 0,
            margin: 0,
            listStyle: "none",
            columnGap,
            transition: theme.transitions.fast("left"),
            position: "relative",
          },
        ]}
        ref={ref}
        style={{
          left: -(index * (width + columnGap)),
        }}
      >
        {items}
      </ul>
      {!noDots && (
        <ul
          css={(theme) => [
            {
              listStyle: "none",
              position: "relative",
              display: "flex",
              width: "100%",
              padding: 0,
              margin: 0,
              justifyContent: "center",
              gridColumn: "1 / -1",
              gap: theme.spacing(1),
              marginTop: theme.spacing(1.5),
            },
          ]}
        >
          {items.map((_, currentIndex) => (
            <div
              key={"bulletitem" + currentIndex}
              css={(theme) => [
                {
                  width: theme.spacing(0.8),
                  height: theme.spacing(0.8),
                  flex: "none",
                  background:
                    index === currentIndex
                      ? theme.colors.text_subtitle_dark
                      : theme.colors.page_bg_light,
                  borderRadius: "100%",
                  transition: theme.transitions.fast("background-color"),
                },
              ]}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Carousel;
