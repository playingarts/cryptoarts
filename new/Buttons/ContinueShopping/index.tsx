import { FC, HTMLAttributes } from "react";
import ArrowButton from "../ArrowButton";
import { Props } from "../Button";
import Link from "../../Link";

const ContinueShopping: FC<HTMLAttributes<HTMLElement> & Props> = ({
  ...props
}) => (
  <Link href="/new/shop">
    <ArrowButton size="small" base noColor {...props}>
      Continue shopping
    </ArrowButton>
  </Link>
);

export default ContinueShopping;
