import { FC, HTMLAttributes, useState } from "react";
import Button, { Props } from "../Button";
import Subscribe from "../../Popups/Subscribe";
import MenuPortal from "../../Header/MainMenu/MenuPortal";

/** Get display label based on product status */
const getStatusLabel = (status?: string): string => {
  switch (status) {
    case "soon":
      return "Coming soon";
    case "soldout":
    default:
      return "Sold out";
  }
};

const SoldOut: FC<HTMLAttributes<HTMLElement> & Props & { status?: string }> = ({ status, size = "small", ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <MenuPortal show={show}>
        {show ? <Subscribe close={() => setShow(false)} /> : null}
      </MenuPortal>
      <Button
        onClick={() => setShow(true)}
        size={size}
        css={(theme) => [
          {
            color: theme.colors.black50,
            backgroundColor: "rgba(0,0,0, 0.05)",
            "&:hover": {
              color: theme.colors.black50,
              opacity: 1,
            },
          },
        ]}
        {...props}
      >
        {getStatusLabel(status)}
      </Button>
    </>
  );
};

export default SoldOut;
