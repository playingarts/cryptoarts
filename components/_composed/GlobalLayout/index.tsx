import { FC, Fragment, useEffect } from "react";
import Layout from "../../../components/Layout";
import Header, { Props as HeaderProps } from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";
import Grid from "../../Grid";
import Esquire from "../../Icons/Esquire";
import FastCompany from "../../Icons/FastCompany";
import CreativeBloq from "../../Icons/CreativeBloq";
import DigitalArts from "../../Icons/DigitalArts";
import Quote from "../../Quote";

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
    query: { scrollIntoView, scrollIntoViewBehavior, ...query },
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
          block: "center",
        });
      };
    }
  }, [query, replace, scrollIntoView, scrollIntoViewBehavior]);

  return (
    <Fragment>
      <Header
        css={(theme) => ({
          position: "fixed",
          left: theme.spacing(1),
          right: theme.spacing(1),
          top: theme.spacing(1),
          zIndex: 10,

          "@media (min-width: 1440px)": {
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
      {extended && (
        <Layout
          css={(theme) => ({
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
      <Layout css={(theme) => ({ marginTop: theme.spacing(1) })}>
        <Footer
          css={(theme) => ({
            marginBottom: theme.spacing(1),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
          })}
        />
      </Layout>
    </Fragment>
  );
};

export default ComposedGlobalLayout;
