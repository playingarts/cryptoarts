import { FC, HTMLAttributes } from "react";
import Link, { Props } from "..";
import Dot from "../../Icons/Dot";

const NewLink: FC<HTMLAttributes<HTMLElement> & Props> = ({
  children,
  ...props
}) => (
  <Link css={(theme) => [theme.typography["p-m"]]} {...props}>
    {children}
    <Dot />
  </Link>
);

export default NewLink;
