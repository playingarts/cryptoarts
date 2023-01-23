import { colord } from "colord";
import { useRouter } from "next/router";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import store from "store";
import { breakpoints } from "../../../source/enums";
import Cross from "../../Icons/Cross";
import Link from "../../Link";
import { useSize } from "../../SizeProvider";

const privacyDate = process.env.NEXT_PUBLIC_PRIVACY_DATE || "test";

const PrivacyNotice: FC<HTMLAttributes<HTMLElement>> = () => {
  const [privacyStatus, setPrivacyStatus] = useState(
    store.get("privacy", "") as string
  );

  useEffect(() => {
    store.set("privacy", privacyStatus);
  }, [privacyStatus]);

  const { width } = useSize();

  const {
    query: { deckId },
  } = useRouter();

  return privacyStatus === privacyDate ? null : (
    <div
      css={(theme) => [
        {
          position: "fixed",
          // bottom: theme.spacing(4),
          // right: theme.spacing(4),
          // left: theme.spacing(4),
          bottom: 0,
          right: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 99999,
          backdropFilter: "blur(20px)",
          background:
            deckId === "crypto"
              ? colord(theme.colors.black)
                  .alpha(0.75)
                  .toRgbString()
              : colord(theme.colors.page_bg_light_gray)
                  .alpha(0.75)
                  .toRgbString(),
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            lineHeight: "var(--buttonHeight)",
            // borderRadius: theme.spacing(10),
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(7.2),
            textTransform: "none",
            position: "relative",
            maxWidth: theme.spacing(123),
            width: "100%",
            textAlign: "center",
            height: theme.spacing(6),

            [theme.maxMQ.sm]: {
              paddingLeft: theme.spacing(2.5),
              textAlign: "left",
              height: "50px",
            },
          },
        ]}
      >
        <span
          css={(theme) => [
            {
              verticalAlign: "middle",
              display: "inline-block",
              lineHeight: `${theme.spacing(6)}px`,
              fontSize: 14,
              color:
                deckId === "crypto"
                  ? theme.colors.text_subtitle_light
                  : theme.colors.text_subtitle_dark,
                  
              [theme.maxMQ.sm]: {
                lineHeight: "50px",
              },
            },
          ]}
        >
          <Link
            href="/privacy"
            css={(theme) => [
              {
                color:
                  deckId === "crypto"
                    ? theme.colors.text_title_light
                    : theme.colors.text_title_dark,
              },
            ]}
          >
            We use cookies
          </Link>{" "}
          and similar technologies
          {width >= breakpoints.sm && " for statistics and marketing purposes."}
        </span>
        <div
          onClick={() => setPrivacyStatus(privacyDate)}
          css={[
            {
              "&:hover": {
                cursor: "pointer",
              },
              position: "absolute",
              right: 0,
              top: "0",
              bottom: "0",
              // transform: "translateY(-50%) rotate(90deg)",
              // height: "100%",
              aspectRatio: "1",
            },
          ]}
        >
          <Cross
            css={(theme) => [
              {
                "&:hover": {
                  cursor: "pointer",
                },
                transform: "translateY(-50%) translateX(-50%) ",
                position: "relative",
                top: "50%",
                left: "50%",

                color:
                  deckId === "crypto"
                    ? theme.colors.text_subtitle_light
                    : theme.colors.text_subtitle_dark,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
