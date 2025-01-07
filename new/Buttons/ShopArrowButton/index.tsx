import { FC, HTMLAttributes } from "react";
import ArrowButton, { Props } from "../Templates/ArrowButton";

const ShopArrowButton: FC<HTMLAttributes<HTMLElement> & Props> = ({
  ...props
}) => {
  return <ArrowButton {...props}>Shop</ArrowButton>;
};

export default ShopArrowButton;
