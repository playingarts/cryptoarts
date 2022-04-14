import { FC, Fragment, useEffect } from "react";
import Layout from "../../../components/Layout";
import Header, { Props as HeaderProps } from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/router";

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
  >
> = ({
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
          block: "start",
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
};

export default ComposedGlobalLayout;
