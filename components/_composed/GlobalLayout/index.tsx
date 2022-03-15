import { FC, Fragment } from "react";
import Layout from "../../../components/Layout";
import Header, { Props as HeaderProps } from "../../../components/Header";
import Footer from "../../../components/Footer";

const ComposedGlobalLayout: FC<
  Pick<
    HeaderProps,
    | "altNav"
    | "showAltNav"
    | "customShopButton"
    | "noNav"
    | "deckId"
    | "palette"
  >
> = ({
  noNav,
  altNav,
  showAltNav,
  customShopButton,
  deckId,
  palette,
  children,
}) => (
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
    />

    {children}

    <Layout css={(theme) => ({ marginTop: theme.spacing(1) })}>
      <Footer
        css={(theme) => ({
          marginBottom: theme.spacing(1),
          marginLeft: -theme.spacing(9.5),
          marginRight: -theme.spacing(9.5),
          paddingLeft: theme.spacing(9.5),
          paddingRight: theme.spacing(9.5),
          paddingTop: theme.spacing(6),
          paddingBottom: theme.spacing(6),
        })}
      />
    </Layout>
  </Fragment>
);

export default ComposedGlobalLayout;
