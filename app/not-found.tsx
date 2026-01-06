/**
 * Not Found page for App Router
 *
 * This replaces pages/404.tsx for routes handled by the App Router.
 * The pages/404.tsx still handles 404s for Pages Router routes.
 */

import ErrorPage from "@/components/Pages/ErrorPage";

export default function NotFound() {
  return <ErrorPage />;
}
