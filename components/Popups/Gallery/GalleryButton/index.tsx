import { FC, HTMLAttributes, useState } from "react";
import Image from "next/image";
import Gallery from "..";
import Button from "../../../Buttons/Button";
import MenuPortal from "../../../Header/MainMenu/MenuPortal";
import Plus from "../../../Icons/Plus";

interface GalleryButtonProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

const GalleryButton: FC<GalleryButtonProps> = ({ src, alt = "", ...props }) => {
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
            aspectRatio: "1",
          },
        ]}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setShow(true)}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        )}
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
