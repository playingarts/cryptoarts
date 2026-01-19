import { FC, HTMLAttributes, useState } from "react";
import Button, { Props } from "../Button";
import Subscribe from "../../Popups/Subscribe";
import MenuPortal from "../../Header/MainMenu/MenuPortal";

const SoldOut: FC<HTMLAttributes<HTMLElement> & Props> = ({ ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <MenuPortal show={show}>
        {show ? <Subscribe close={() => setShow(false)} /> : null}
      </MenuPortal>
      <Button
        onClick={() => setShow(true)}
        size="small"
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
        Sold out
      </Button>
    </>
  );
};

export default SoldOut;
