import { renderHook, act } from "@testing-library/react";
import { useBag } from "../../hooks/bag";

describe("hooks/useBag", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty bag", () => {
    const { result } = renderHook(() => useBag());

    expect(result.current.bag).toEqual({});
  });

  it("should add item to bag", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1");
    });

    expect(result.current.bag["product-1"]).toBe(1);
  });

  it("should increment quantity when adding same item", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1");
    });

    act(() => {
      result.current.addItem("product-1");
    });

    expect(result.current.bag["product-1"]).toBe(2);
  });

  it("should add item with specific quantity", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1", 5);
    });

    expect(result.current.bag["product-1"]).toBe(5);
  });

  it("should update item quantity", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1", 2);
    });

    act(() => {
      result.current.updateQuantity("product-1", 10);
    });

    expect(result.current.bag["product-1"]).toBe(10);
  });

  it("should remove item from bag", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1");
      result.current.addItem("product-2");
    });

    act(() => {
      result.current.removeItem("product-1");
    });

    expect(result.current.bag["product-1"]).toBeUndefined();
    expect(result.current.bag["product-2"]).toBe(1);
  });

  it("should handle multiple items", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1", 2);
    });

    act(() => {
      result.current.addItem("product-2", 3);
    });

    act(() => {
      result.current.addItem("product-3", 1);
    });

    expect(Object.keys(result.current.bag)).toHaveLength(3);
    expect(result.current.bag["product-1"]).toBe(2);
    expect(result.current.bag["product-2"]).toBe(3);
    expect(result.current.bag["product-3"]).toBe(1);
  });

  it("should handle removing non-existent item gracefully", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1");
    });

    act(() => {
      result.current.removeItem("non-existent");
    });

    expect(result.current.bag["product-1"]).toBe(1);
  });

  it("should set quantity to 0 when updating to 0", () => {
    const { result } = renderHook(() => useBag());

    act(() => {
      result.current.addItem("product-1", 5);
    });

    act(() => {
      result.current.updateQuantity("product-1", 0);
    });

    expect(result.current.bag["product-1"]).toBe(0);
  });
});
