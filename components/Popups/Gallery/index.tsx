import { FC, HTMLAttributes, useEffect } from "react";
import Image from "next/image";
import NavButton from "../../Buttons/NavButton";
import image from "../../../mocks/images/Wolf.png";
import Button from "../../Buttons/Button";
import Plus from "../../Icons/Plus";

const Gallery: FC<HTMLAttributes<HTMLElement> & { close: () => void }> = ({
  close,
  ...props
}) => {
  // Lock body scroll when popup is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      css={(theme) => [
        {
          background: theme.colors.black30,
          width: "100%",
          position: "fixed",
          inset: 0,
          zIndex: 9999,

          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onClick={close}
      {...props}
    >
      <div
        css={(theme) => [
          {
            borderRadius: theme.spacing(1.5),
            overflow: "hidden",
            width: "100%",
            maxWidth: 740,
            aspectRatio: "1",
            display: "grid",
            position: "relative",
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src={image}
          alt="Gallery artwork"
          fill
          sizes="740px"
          style={{ objectFit: "cover" }}
          priority
        />
        <Button
          css={[
            {
              position: "absolute",
              top: 30,
              right: 30,
              borderRadius: "100%",
              padding: 0,
              width: 45,
              height: 45,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              color: "black",
              background: "white",
              "&:hover": {
                color: "black",
              },
            },
          ]}
          onClick={close}
          aria-label="Close gallery"
        >
          <Plus css={[{ rotate: "45deg" }]} />
        </Button>
        <div css={[{ position: "absolute", left: 30, bottom: 30 }]}>
          <NavButton
            css={[{ background: "white", rotate: "180deg", marginRight: 5 }]}
          />
          <NavButton css={[{ background: "white" }]} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
