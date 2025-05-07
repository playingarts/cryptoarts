import { FC, ImgHTMLAttributes, useState } from "react";
import Gallery from "..";
import Button from "../../../Buttons/Button";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Plus from "../../../Icons/Plus";

const GalleryButton: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        css={[
          {
            position: "relative",
            borderRadius: 15,
            overflow: "hidden",
            cursor: "pointer",
          },
        ]}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setShow(true)}
      >
        <img src={src} alt="" css={[{ width: "100%", height: "100%" }]} />
        <Button
          style={{ opacity: hover ? 1 : 0 }}
          css={(theme) => [
            {
              position: "absolute",
              bottom: 15,
              right: 15,
              borderRadius: "100%",
              padding: 0,
              width: 45,
              height: 45,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              color: "black",
              background: "white",
              transition: theme.transitions.fast("transform"),
              "&:hover": {
                color: "black",
                opacity: 1,
                transform: "rotate(90deg)",
              },
            },
          ]}
        >
          <Plus />
        </Button>
      </div>
      <MenuPortal show={show}>
        {show ? (
          <Gallery
            close={() => {
              setShow(false);
            }}
          />
        ) : null}
      </MenuPortal>
    </>
  );
};

export default GalleryButton;
