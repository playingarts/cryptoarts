"use client";

/**
 * Client-side providers for App Router
 *
 * This component wraps all client-side context providers that were
 * previously in pages/_app.tsx. It's marked 'use client' because
 * these providers use React hooks and client-side functionality.
 */

import { ThemeProvider } from "@emotion/react";
import { MetaMaskProvider } from "metamask-react";
import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import SizeProvider from "@/components/SizeProvider";
import { SignatureProvider } from "@/contexts/SignatureContext";
import { ViewedProvider } from "@/contexts/viewedContext";
import { DeckPaletteProvider } from "@/components/Pages/Deck/DeckPaletteContext";
import { IsEuropeProvider } from "@/components/Contexts/bag";
import { FavoritesProvider } from "@/components/Contexts/favorites";
import ErrorBoundary from "@/components/ErrorBoundary";
import { theme } from "../styles/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothscroll.polyfill();
    }
  }, []);

  return (
    <MetaMaskProvider>
      <SignatureProvider>
        <DeckPaletteProvider>
          <ThemeProvider theme={theme}>
            <ViewedProvider>
              <IsEuropeProvider>
                <FavoritesProvider>
                  <SizeProvider isMobile={false}>
                    <ErrorBoundary>{children}</ErrorBoundary>
                  </SizeProvider>
                </FavoritesProvider>
              </IsEuropeProvider>
            </ViewedProvider>
          </ThemeProvider>
        </DeckPaletteProvider>
      </SignatureProvider>
    </MetaMaskProvider>
  );
}
