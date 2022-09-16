import { useRouter } from "next/router";
import { FC, Fragment, useEffect } from "react";
import Footer from "../../../components/Footer";
import Header, { Props as HeaderProps } from "../../../components/Header";
import Layout from "../../../components/Layout";
import { breakpoints } from "../../../source/enums";
import Grid from "../../Grid";
import CreativeBloq from "../../Icons/CreativeBloq";
import DigitalArts from "../../Icons/DigitalArts";
import Esquire from "../../Icons/Esquire";
import FastCompany from "../../Icons/FastCompany";
import Quote from "../../Quote";
import { useSize } from "../../SizeProvider";
import PrivacyNotice from "../PrivacyNotice";

const ComposedGlobalLayout: FC<
  Pick<
    HeaderProps,
    | "altNav"
    | "showAltNav"
    | "customShopButton"
    | "noNav"
    | "deckId"
    | "palette"
    | "isCardPage"
  > & {
    extended?: boolean;
  }
> = ({
  extended,
  noNav,
  altNav,
  showAltNav,
  customShopButton,
  deckId,
  palette,
  children,
  isCardPage,
}) => {
  const {
    query: {
      scrollIntoView,
      scrollIntoViewBehavior,
      scrollIntoViewPosition,
      ...query
    },
    replace,
  } = useRouter();

  useEffect(() => {
    if (!scrollIntoView) {
      return;
    }

    const element = document.querySelector(
      scrollIntoView instanceof Array ? scrollIntoView[0] : scrollIntoView
    );

    if (element) {
      replace({ query }, undefined, {
        scroll: false,
        shallow: true,
      });

      return () => {
        element.scrollIntoView({
          behavior:
            scrollIntoViewBehavior === "smooth"
              ? scrollIntoViewBehavior
              : "auto",
          block: (scrollIntoViewPosition as ScrollLogicalPosition) || "center",
        });
      };
    }
  }, [query, replace, scrollIntoView, scrollIntoViewBehavior]);

  const { width } = useSize();

  return (
    <Fragment>
      <Header
        css={(theme) => ({
          position: "fixed",
          left: theme.spacing(1),
          right: theme.spacing(1),
          top: theme.spacing(1),
          zIndex: 10,
          [theme.maxMQ.sm]: {
            left: theme.spacing(0.5),
            right: theme.spacing(0.5),
            top: theme.spacing(0.5),
          },

          [theme.mq.laptop]: {
            maxWidth: theme.spacing(142),
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
          },
        })}
        deckId={deckId}
        altNav={altNav}
        showAltNav={showAltNav}
        customShopButton={customShopButton}
        noNav={noNav}
        palette={palette}
        isCardPage={isCardPage}
      />

      {children}
      {extended && width >= breakpoints.sm && (
        <Layout
          css={(theme) => ({
            background: theme.colors.white,
            paddingTop: theme.spacing(12),
            paddingBottom: theme.spacing(12),
          })}
        >
          <Grid
            css={(theme) => ({
              gap: theme.spacing(3),
              [theme.maxMQ.md]: {
                [theme.maxMQ.md]: {
                  gridTemplateColumns: `repeat(6, ${theme.spacing(7.5)}px)`,
                },
              },
            })}
          >
            <div css={{ gridColumn: "span 3", textAlign: "center" }}>
              <Esquire />
            </div>
            <div css={{ gridColumn: "span 3", textAlign: "center" }}>
              <FastCompany />
            </div>
            <div css={{ gridColumn: "span 3", textAlign: "center" }}>
              <CreativeBloq />
            </div>
            <div css={{ gridColumn: "span 3", textAlign: "center" }}>
              <DigitalArts />
            </div>
          </Grid>
          <Grid
            short={true}
            css={(theme) => ({
              marginTop: theme.spacing(10),
            })}
          >
            <Quote css={{ gridColumn: "1 / -1" }}>
              “This really is a unique deck. The concept is playful, and elegant
              at the same time. The colors are vibrant. A wonderful price of
              art.”
            </Quote>
          </Grid>
        </Layout>
      )}
      <div
        css={(theme) => [
          {
            background: theme.colors.white,
            padding: theme.spacing(1),
          },
        ]}
      >
        <Layout
          css={(theme) => ({
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            [theme.maxMQ.sm]: {
              paddingTop: theme.spacing(4),
              paddingBottom: theme.spacing(4),
            },
            background: theme.colors.page_bg_light_gray,
            borderRadius: theme.spacing(1),
          })}
        >
          <Footer copyrightLast={width < breakpoints.sm} reverseMobile={true} />
        </Layout>
      </div>
      <PrivacyNotice />
    </Fragment>
  );
};

export default ComposedGlobalLayout;
