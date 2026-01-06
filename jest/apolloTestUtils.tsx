import { ReactNode } from "react";
import { MockedResponse } from "@apollo/client/testing";
import { MockedProvider } from "@apollo/client/testing/react";
import { renderHook, RenderHookOptions } from "@testing-library/react";

/**
 * Creates a wrapper component for testing Apollo hooks
 */
export function createApolloWrapper(mocks: MockedResponse[] = []) {
  return function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
      <MockedProvider mocks={mocks}>
        {children}
      </MockedProvider>
    );
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
 * This helper waits for the event loop to process multiple ticks.
 */
export async function waitForQuery(): Promise<void> {
  // Apollo 4 needs multiple event loop ticks for mock resolution
  await new Promise((resolve) => setTimeout(resolve, 100));
}
