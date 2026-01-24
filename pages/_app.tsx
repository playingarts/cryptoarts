import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@emotion/react";
import "modern-normalize/modern-normalize.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Fragment, useEffect, useMemo } from "react";
import smoothscroll from "smoothscroll-polyfill";

import { initNavInstrumentation } from "../source/utils/navInstrumentation";
import { initPerfNavTracer } from "../source/utils/perfNavTracer";
import SizeProvider from "@/components/SizeProvider";
import { ViewedProvider } from "@/components/Contexts/viewed";
import { DeckPaletteProvider } from "@/components/Pages/Deck/DeckPaletteContext";
import { HeroCardsProvider } from "@/components/Pages/Deck/HeroCardsContext";
import { IsEuropeProvider } from "@/components/Contexts/bag";
import { FavoritesProvider } from "@/components/Contexts/favorites";
import { MenuProvider } from "@/components/Contexts/menu";
import { AuthProvider } from "@/components/Contexts/auth";
import ErrorBoundary from "@/components/ErrorBoundary";
import FloatingFavButton from "@/components/FloatingFavButton";
import { FlyingFavProvider } from "@/components/Contexts/flyingFav";
import { initApolloClient } from "../source/apollo";

// Import theme from dedicated module
import { theme } from "../styles/theme";

// Import fonts to trigger next/font CSS injection
import "../styles/fonts";

// Re-export theme parts for backward compatibility
export {
  theme,
  colorLiterals,
  customcolors,
  typographyLiterals,
} from "../styles/theme";

const App = ({
  Component,
  pageProps,
  isMobile,
}: AppProps & { isMobile: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothscroll.polyfill();
    }
  }, []);

  // Reset body overflow on route change (fixes popup scroll lock persisting)
  useEffect(() => {
    const handleRouteChange = () => {
      document.body.style.overflow = "";
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // Navigation instrumentation for debugging (enable with ?debugNav or localStorage.debugNav=true)
  useEffect(() => {
    return initNavInstrumentation(router);
  }, [router]);

  // Performance navigation tracer (enable with ?perfNav=1 or localStorage.perfNav=true)
  useEffect(() => {
    return initPerfNavTracer(router);
  }, [router]);

  // Initialize Apollo client at app level for components outside page-level withApollo
  // Page-level withApollo will override this with SSR-hydrated cache for page components
  // Support both 'apolloState' (withApollo HOC) and 'cache' (getStaticProps) prop names
  const apolloClient = useMemo(
    () => initApolloClient(pageProps.apolloState || pageProps.cache),
    [pageProps.apolloState, pageProps.cache]
  );

  return (
    <Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Playing Arts - Collective Art Project</title>
        <meta
          name="description"
          content="Collective Art Project for creative people who are into illustrations, playing cards, NFTs and sometimes magic."
        />
      </Head>

      <ApolloProvider client={apolloClient}>
        <DeckPaletteProvider>
          <HeroCardsProvider>
            <ThemeProvider theme={theme}>
              <ViewedProvider>
                <IsEuropeProvider>
                  <FavoritesProvider>
                    <SizeProvider isMobile={isMobile === true}>
                      <MenuProvider>
                        <AuthProvider>
                          <GoogleAnalytics trackPageViews />
                          <ErrorBoundary>
                            <FlyingFavProvider>
                              <Component {...pageProps} />
                              <FloatingFavButton />
                            </FlyingFavProvider>
                          </ErrorBoundary>
                        </AuthProvider>
                      </MenuProvider>
                    </SizeProvider>
                  </FavoritesProvider>
                </IsEuropeProvider>
              </ViewedProvider>
            </ThemeProvider>
          </HeroCardsProvider>
        </DeckPaletteProvider>
      </ApolloProvider>
    </Fragment>
  );
};

export default App;
