import { FC, HTMLAttributes } from "react";
import ArrowButton from "../ArrowButton";
import { Props } from "../Button";
import Link from "../../Link";

const ContinueShopping: FC<HTMLAttributes<HTMLElement> & Props> = ({
  ...props
}) => (
  <Link href={(process.env.NEXT_PUBLIC_BASELINK || "") + "/shop"}>
    <ArrowButton size="small" base noColor {...props}>
      Back to shop
    </ArrowButton>
  </Link>
);

export default ContinueShopping;
