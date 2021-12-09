import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLUListElement> {
  items: JSX.Element[];
}

const Grid: FC<Props> = ({ items, ...props }) => (
  <ul
    {...props}
    css={{
      display: "flex",
      listStyle: "none",
      justifyContent: "space-between",
    }}
  >
    {items.map((item) => item)}
  </ul>
);

export default Grid;
