import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  index: number;
  items: string[];
}

const Carousel: FC<Props> = ({ index, items, ...props }) => {
  return (
    <div
      {...props}
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
            columnGap: theme.spacing(3),
            transition: theme.transitions.fast("left"),
            position: "relative",
          },
          {
            left: -(index * theme.spacing(39 + 3)),
          },
        ]}
      >
        {items.map((item) => (
          <li
            key={item}
            css={(theme) => ({
              width: theme.spacing(39),
              height: theme.spacing(39),
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
