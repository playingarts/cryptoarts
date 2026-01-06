import { ReactNode } from "react";
import { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/client/testing/react";
import { renderHook, RenderHookOptions, waitFor } from "@testing-library/react";

/**
 * Creates a wrapper component for testing Apollo hooks
 */
export function createApolloWrapper(mocks: MockedResponse[] = []) {
  return function ApolloWrapper({ children }: { children: ReactNode }) {
    return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
  };
}

/**
 * Renders a hook with Apollo MockedProvider
 */
export function renderApolloHook<TResult, TProps>(
  hook: (props: TProps) => TResult,
  options: {
    mocks?: MockedResponse[];
  } & Omit<RenderHookOptions<TProps>, "wrapper"> = {}
) {
  const { mocks = [], ...renderOptions } = options;
  return renderHook(hook, {
    wrapper: createApolloWrapper(mocks),
    ...renderOptions,
  });
}

/**
 * Helper to wait for Apollo query to resolve
 * Uses waitFor from testing-library to properly wait for async updates
 *
 * Apollo Client 4 has different timing for mock resolution than v3.
 */
export async function waitForQuery(): Promise<void> {
  // Use waitFor to properly handle React state updates
  await waitFor(
    () => new Promise((resolve) => setTimeout(resolve, 0)),
    { timeout: 1000 }
  );
}

export { waitFor };
