import { FC, Fragment } from "react";
import Layout from "../../../components/Layout";
import Header, { Props as HeaderProps } from "../../../components/Header";
import Footer from "../../../components/Footer";

const GlobalLayout: FC<
  Pick<HeaderProps, "altNav" | "showAltNav" | "customShopButton">
> = ({ altNav, showAltNav, customShopButton, children }) => (
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
      altNav={altNav}
      showAltNav={showAltNav}
      customShopButton={customShopButton}
    />

    {children}

    <Layout>
      <Footer
        css={(theme) => ({
          marginBottom: theme.spacing(1),
        })}
      />
    </Layout>
  </Fragment>
);

export default GlobalLayout;
