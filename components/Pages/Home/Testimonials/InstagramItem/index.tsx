import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import Text from "../../../../Text";
import Dot from "../../../../Icons/Dot";
import Instagram from "../../../../Icons/Instagram";

// Extract post ID from Instagram URL
const getPostId = (url: string) => {
  const match = url.match(/\/p\/([^/]+)/);
  return match ? match[1] : null;
};

const InstagramItem: FC<
  HTMLAttributes<HTMLElement> & { url: string; username: string }
> = ({ url, username, ...props }) => {
  const postId = getPostId(url);
  const imagePath = postId ? `/images/instagram/${postId}.jpg` : null;

  return (
    <div
      css={{
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
      {...props}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        css={(theme) => ({
          display: "block",
          position: "relative",
          width: 300,
          height: 300,
          borderRadius: theme.spacing(2),
          overflow: "hidden",
          background: theme.colors.soft_gray,
          "&:hover": {
            "& .instagram-overlay": {
              opacity: 1,
            },
          },
          [theme.maxMQ.xsm]: {
            width: 300,
            height: 300,
          },
        })}
      >
        {imagePath ? (
          <Image
            src={imagePath}
            alt={`Instagram post by @${username}`}
            fill
            sizes="300px"
            css={{ objectFit: "cover" }}
          />
        ) : (
          <div
            css={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: theme.colors.black30,
            })}
          >
            <Instagram css={{ width: 60, height: 60 }} />
          </div>
        )}
        <div
          className="instagram-overlay"
          css={(theme) => ({
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)",
            opacity: 0,
            transition: "opacity 0.2s ease",
            color: theme.colors.white,
          })}
        >
          <Instagram css={{ width: 40, height: 40 }} />
        </div>
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        css={{ textDecoration: "none" }}
      >
        <Text typography="p-s" css={(theme) => ({ marginTop: theme.spacing(1) })}>
          @{username} <Dot />
        </Text>
      </a>
    </div>
  );
};

export default InstagramItem;
