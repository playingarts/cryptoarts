import { colord } from "colord";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import store from "store";
import Cross from "../../Icons/Cross";
import Link from "../../Link";

const privacyDate = process.env.NEXT_PUBLIC_PRIVACY_DATE || "test";

const PrivacyNotice: FC<HTMLAttributes<HTMLElement>> = () => {
  const [privacyStatus, setPrivacyStatus] = useState(
    store.get(privacyDate, "") as string
  );

  useEffect(() => {
    store.set(privacyDate, privacyStatus);
  }, [privacyStatus]);

  return privacyStatus === privacyDate ? null : (
    <div
      css={(theme) => [
        {
          position: "fixed",
          bottom: theme.spacing(4),
          right: theme.spacing(4),
          left: theme.spacing(4),
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        },
      ]}
    >
      <div
        css={(theme) => [
          {
            lineHeight: "var(--buttonHeight)",
            borderRadius: theme.spacing(10),
            backgroundColor: colord(theme.colors.black)
              .alpha(0.8)
              .toRgbString(),
            color: theme.colors.text_subtitle_light,
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(7.2),
            textTransform: "none",
            position: "relative",
            [theme.maxMQ.sm]: {
              borderRadius: theme.spacing(5),
            },
          },
        ]}
      >
        <span
          css={(theme) => [
            {
              verticalAlign: "middle",
              display: "inline-block",
              lineHeight: 1.2,
              paddingTop: theme.spacing(1.25),
              paddingBottom: theme.spacing(1.25),
            },
          ]}
        >
          We use cookies and similar technologies for statistics and marketing
          purposes.{" "}
          <Link
            href="/privacy"
            css={(theme) => [
              {
                color: theme.colors.text_title_light,
              },
            ]}
          >
            Privacy Statement
          </Link>
        </span>

        <Cross
          onClick={() => setPrivacyStatus(privacyDate)}
          css={(theme) => [
            {
              "&:hover": {
                cursor: "pointer",
              },
              position: "absolute",
              right: theme.spacing(2.7),
              top: "50%",
              transform: "translateY(-50%)",
              width: theme.spacing(1.8),
              height: theme.spacing(1.8),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PrivacyNotice;
