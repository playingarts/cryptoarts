import { ThemeProvider } from "@emotion/react";
import { MetaMaskProvider } from "metamask-react";
import "modern-normalize/modern-normalize.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Fragment, useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import SizeProvider from "@/components/SizeProvider";
import { SignatureProvider } from "@/contexts/SignatureContext";
import { ViewedProvider } from "@/contexts/viewedContext";
import { DeckPaletteProvider } from "@/components/Pages/Deck/DeckPaletteContext";
import { IsEuropeProvider } from "@/components/Contexts/bag";
import { FavoritesProvider } from "@/components/Contexts/favorites";
import { MenuProvider } from "@/components/Contexts/menu";
import ErrorBoundary from "@/components/ErrorBoundary";

// Import theme from dedicated module
import { theme } from "../styles/theme";

// Re-export theme parts for backward compatibility
// TODO: Update imports in other files to use "../styles/theme" directly
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
  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothscroll.polyfill();
    }
  }, []);

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

      <MetaMaskProvider>
        <SignatureProvider>
          <DeckPaletteProvider>
            <ThemeProvider theme={theme}>
              <ViewedProvider>
                <IsEuropeProvider>
                  <FavoritesProvider>
                    <SizeProvider isMobile={isMobile === true}>
                      <MenuProvider>
                        <GoogleAnalytics trackPageViews />
                        <ErrorBoundary>
                          <Component {...pageProps} />
                        </ErrorBoundary>
                      </MenuProvider>
                    </SizeProvider>
                  </FavoritesProvider>
                </IsEuropeProvider>
              </ViewedProvider>
            </ThemeProvider>
          </DeckPaletteProvider>
        </SignatureProvider>
      </MetaMaskProvider>
    </Fragment>
  );
};

export default App;
