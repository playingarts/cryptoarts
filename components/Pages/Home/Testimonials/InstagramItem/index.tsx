import { FC, HTMLAttributes } from "react";
import { StaticImageData } from "next/image";
import Text from "../../../../Text";
import Dot from "../../../../Icons/Dot";
import GalleryButton from "../../../../Popups/Gallery/GalleryButton";

const InstagramItem: FC<
  HTMLAttributes<HTMLElement> & { image: string | StaticImageData; username: string }
> = ({ image, username, ...props }) => {
  const imageSrc = typeof image === "string" ? image : image.src;

  return (
    <div
      css={{
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
      {...props}
    >
      <GalleryButton
        src={imageSrc}
        css={{ width: 300, height: 300 }}
      />
      <Text typography="linkNewTypography" css={{ marginTop: 15 }}>
        @{username} <Dot />
      </Text>
    </div>
  );
};

export default InstagramItem;
