import { ReactNode } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { renderHook, RenderHookOptions, waitFor } from "@testing-library/react";

/**
 * Creates a wrapper component for testing Apollo hooks
 */
export function createApolloWrapper(mocks: MockedResponse[] = []) {
  return function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
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
 */
export async function waitForQuery(): Promise<void> {
  // Wait for at least one tick to allow Apollo to process
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
}
