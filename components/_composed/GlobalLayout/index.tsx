import { FC, Fragment } from "react";
import Footer from "../../../components/Footer";
import { Props as HeaderProps } from "../../../components/Header";
import Layout from "../../../components/Layout";
import { breakpoints } from "../../../source/enums";
import Grid from "../../Grid";
import CreativeBloq from "../../Icons/CreativeBloq";
import DigitalArts from "../../Icons/DigitalArts";
import Esquire from "../../Icons/Esquire";
import FastCompany from "../../Icons/FastCompany";
import Quote from "../../Quote";
import ScrollArrow from "../../ScrollArrow";
import ScrollIntoView from "../../ScrollIntoView";
import { useSize } from "../../SizeProvider";
import ComposedHeader from "../ComposedHeader";
import PrivacyNotice from "../PrivacyNotice";
// const Header = dynamic(() => import("../../../components/Header"), {
//   ssr: false,
// });

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
    scrollArrow?: string;
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
  scrollArrow,
}) => {
  const { width } = useSize();

  return (
    <Fragment>
      <ScrollIntoView />
      <ComposedHeader
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
            borderRadius: "0px 0px 50px 50px",
            zIndex: 1,
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

      <Footer />

      <PrivacyNotice />
      {scrollArrow && width >= breakpoints.sm && !isCardPage && (
        <ScrollArrow scrollTo={scrollArrow} />
      )}
    </Fragment>
  );
};

export default ComposedGlobalLayout;
