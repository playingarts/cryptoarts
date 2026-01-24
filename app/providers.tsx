"use client";

/**
 * Client-side providers for App Router
 *
 * This component wraps all client-side context providers that were
 * previously in pages/_app.tsx. It's marked 'use client' because
 * these providers use React hooks and client-side functionality.
 *
 * Note: DeckPaletteProvider is NOT included here because it uses
 * next/router (Pages Router). Deck pages are served via Pages Router
 * which has its own providers in pages/_app.tsx.
 */

import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";
import SizeProvider from "@/components/SizeProvider";
import { ViewedProvider } from "@/components/Contexts/viewed";
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
  );
}
