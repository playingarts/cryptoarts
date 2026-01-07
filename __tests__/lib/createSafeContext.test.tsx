/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createSafeContext } from "../../lib/createSafeContext";

interface TestContextValue {
  name: string;
  greet: () => string;
}

describe("createSafeContext", () => {
  const [TestProvider, useTest, TestContext] =
    createSafeContext<TestContextValue>("Test");

  const TestConsumer = () => {
    const { name, greet } = useTest();
    return (
      <div>
        <span data-testid="name">{name}</span>
        <span data-testid="greet">{greet()}</span>
      </div>
    );
  };

  it("should provide context value when wrapped in provider", () => {
    const value: TestContextValue = {
      name: "Alice",
      greet: () => "Hello!",
    };

    render(
      <TestProvider value={value}>
        <TestConsumer />
      </TestProvider>
    );

    expect(screen.getByTestId("name")).toHaveTextContent("Alice");
    expect(screen.getByTestId("greet")).toHaveTextContent("Hello!");
  });

  it("should throw error when used outside provider", () => {
    // Suppress React error boundary console output
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow(
      "useTest must be used within a TestProvider. Wrap your component tree with <TestProvider>."
    );

    consoleSpy.mockRestore();
  });

  it("should set displayName on context for debugging", () => {
    expect(TestContext.displayName).toBe("Test");
  });

  it("should work with nested providers (inner wins)", () => {
    const outerValue: TestContextValue = {
      name: "Outer",
      greet: () => "Outer greeting",
    };

    const innerValue: TestContextValue = {
      name: "Inner",
      greet: () => "Inner greeting",
    };

    render(
      <TestProvider value={outerValue}>
        <TestProvider value={innerValue}>
          <TestConsumer />
        </TestProvider>
      </TestProvider>
    );

    expect(screen.getByTestId("name")).toHaveTextContent("Inner");
    expect(screen.getByTestId("greet")).toHaveTextContent("Inner greeting");
  });
});
