import { FC, HTMLAttributes, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { theme } from "../../pages/_app";

export interface Props extends HTMLAttributes<HTMLElement> {
  index: number;
  items: string[];
  onIndexChange: (offset: number) => void;
}

const Carousel: FC<Props> = ({ index, items, onIndexChange, ...props }) => {
  const width = theme.spacing(39);
  const columnGap = theme.spacing(3);
  const ref = useRef<HTMLUListElement>(null);
  const handlers = useSwipeable({
    onSwipeStart: () => {
      if (!ref.current) {
        return;
      }

      ref.current.style.transition = "none";
    },
    onSwiped: ({ absX, deltaX }) => {
      if (!ref.current) {
        return;
      }

      ref.current.style.transition = theme.transitions.fast("left");
      ref.current.style.left = `${-(index * (width + columnGap))}px`;

      if (width / 2 < absX) {
        const offset = Math.floor((absX - width / 2) / width) + 1;

        onIndexChange(deltaX < 0 ? offset : -offset);
      }
    },
    onSwiping: ({ deltaX }) => {
      if (!ref.current) {
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
        overflow: "hidden",
        borderRadius: theme.spacing(2),
      })}
    >
      <ul
        css={(theme) => [
          {
            display: "flex",
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
        {items.map((item) => (
          <li
            key={item}
            css={(theme) => ({
              width,
              height: width,
              borderRadius: theme.spacing(2),
              flexShrink: 0,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            })}
            style={{ backgroundImage: `url(${item})` }}
          />
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
