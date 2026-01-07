import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

describe("hooks/useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should return initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    // Wait for useEffect to run
    expect(result.current[0]).toBe("initial-value");
  });

  it("should return stored value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    expect(result.current[0]).toBe("stored-value");
  });

  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "initial-value")
    );

    act(() => {
      result.current[1]("new-value");
    });

    expect(result.current[0]).toBe("new-value");
    expect(JSON.parse(localStorage.getItem("test-key") || "")).toBe(
      "new-value"
    );
  });

  it("should handle function updates", () => {
    const { result } = renderHook(() => useLocalStorage<number>("counter", 0));

    act(() => {
      result.current[1]((prev) => (prev ?? 0) + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prev) => (prev ?? 0) + 5);
    });

    expect(result.current[0]).toBe(6);
  });

  it("should handle object values", () => {
    const initialObj = { name: "test", count: 0 };
    const { result } = renderHook(() =>
      useLocalStorage("test-object", initialObj)
    );

    act(() => {
      result.current[1]({ name: "updated", count: 5 });
    });

    expect(result.current[0]).toEqual({ name: "updated", count: 5 });
  });

  it("should handle array values", () => {
    const initialArr = [1, 2, 3];
    const { result } = renderHook(() =>
      useLocalStorage("test-array", initialArr)
    );

    act(() => {
      result.current[1]([4, 5, 6]);
    });

    expect(result.current[0]).toEqual([4, 5, 6]);
  });

  it("should handle invalid JSON in localStorage gracefully", () => {
    localStorage.setItem("test-key", "invalid-json");

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default-value")
    );

    expect(result.current[0]).toBe("default-value");
  });

  it("should use different storage keys independently", () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage("key1", "value1")
    );
    const { result: result2 } = renderHook(() =>
      useLocalStorage("key2", "value2")
    );

    expect(result1.current[0]).toBe("value1");
    expect(result2.current[0]).toBe("value2");

    act(() => {
      result1.current[1]("updated1");
    });

    expect(result1.current[0]).toBe("updated1");
    expect(result2.current[0]).toBe("value2");
  });
});
