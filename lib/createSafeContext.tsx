"use client";

import { createContext, useContext, Context, Provider } from "react";

/**
 * Creates a type-safe React context with proper error handling.
 *
 * Unlike `createContext({} as T)`, this pattern:
 * - Throws a helpful error if the hook is used outside the provider
 * - Provides proper TypeScript types without type assertions
 * - Makes provider requirements explicit at compile time
 *
 * @example
 * ```tsx
 * interface UserContextValue {
 *   user: User | null;
 *   login: (email: string) => Promise<void>;
 * }
 *
 * const [UserProvider, useUser] = createSafeContext<UserContextValue>("User");
 *
 * // In a component:
 * const { user, login } = useUser(); // Type-safe, throws if outside provider
 * ```
 */
export function createSafeContext<T>(
  displayName: string
): [Provider<T>, () => T, Context<T | null>] {
  const Context = createContext<T | null>(null);
  Context.displayName = displayName;

  function useContextValue(): T {
    const value = useContext(Context);

    if (value === null) {
      throw new Error(
        `use${displayName} must be used within a ${displayName}Provider. ` +
          `Wrap your component tree with <${displayName}Provider>.`
      );
    }

    return value;
  }

  // Name the hook for better debugging
  Object.defineProperty(useContextValue, "name", {
    value: `use${displayName}`,
  });

  return [Context.Provider, useContextValue, Context];
}
