import { FC, HTMLAttributes, useEffect } from "react";
import dynamic from "next/dynamic";
import subscribeimg from "../../../mocks/images/POPS/Subscribe.png";
import Button from "../../Buttons/Button";
import Plus from "../../Icons/Plus";
import ArrowedButton from "../../Buttons/ArrowedButton";

// Lazy load EmailForm to reduce bundle (includes react-hook-form ~23kB)
const EmailForm = dynamic(() => import("../../EmailForm"), {
  ssr: false,
  loading: () => <div css={{ height: 55 }} />,
});
import Text from "../../Text";
import Instagram from "../../Icons/Instagram";
import Twitter from "../../Icons/Twitter";
import Youtube from "../../Icons/Youtube";
import Link from "../../Link";
import { socialLinks } from "../../../source/consts";

const Subscribe: FC<HTMLAttributes<HTMLElement> & { close: () => void }> = ({
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
            maxWidth: 1130,
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: theme.spacing(3),
            backgroundColor: theme.colors.accent,
          },
        ]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={subscribeimg.src}
          alt="Playing Arts card artwork preview"
          css={[{ height: 600, aspectRatio: "500 / 600" }]}
        />
        <div
          css={[
            {
              width: "100%",
              position: "relative",
              display: "grid",
              alignItems: "center",
              paddingLeft: 80,
              paddingRight: 30,
            },
          ]}
        >
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
            aria-label="Close popup"
          >
            <Plus css={[{ rotate: "45deg" }]} />
          </Button>
          <div>
            <ArrowedButton css={[{ marginBottom: 60, color: "white" }]}>
              Explore project updates
            </ArrowedButton>
            <EmailForm />
            <Text
              typography="paragraphNano"
              css={[{ marginTop: 15, color: "white" }]}
            >
              Join 10,000+ collectors for early access to exclusive drops, and
              gain automatic entry into our monthly giveaways.
            </Text>
            <div
              css={(theme) => [
                { marginTop: theme.spacing(3), display: "flex", gap: theme.spacing(3), color: "white" },
              ]}
            >
              <Link href={socialLinks.instagram}>
                <Instagram />
              </Link>
              <Link href={socialLinks.twitter}>
                <Twitter />
              </Link>
              <Link href={socialLinks.youtube}>
                <Youtube />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
