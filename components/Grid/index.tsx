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
      padding: 0,
      margin: 0,
      alignItems: "center",
    }}
  >
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export default Grid;
