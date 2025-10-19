/**
 * Responsive Auth Hooks Tests
 * Tests for responsive authentication UI hooks
 */

import {
  useAuthFormWidth,
  useAuthInputSize,
  useAuthLayout,
  useAuthSpacing,
  useShouldShowSocialAuth,
} from "@/hooks/use-responsive-auth";
import { renderHook } from "@testing-library/react-native";
import { Dimensions } from "react-native";

describe("useAuthLayout", () => {
  it("should return compact layout for small screens", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthLayout());
    expect(result.current).toBe("compact");
  });

  it("should return standard layout for medium screens", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 768,
      height: 1024,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthLayout());
    expect(result.current).toBe("standard");
  });

  it("should return wide layout for large screens", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 1200,
      height: 800,
      scale: 1,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthLayout());
    expect(result.current).toBe("wide");
  });

  it("should return split layout for extra large screens", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 1440,
      height: 900,
      scale: 1,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthLayout());
    expect(result.current).toBe("split");
  });
});

describe("useAuthFormWidth", () => {
  it("should return 100% for compact layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthFormWidth());
    expect(result.current).toBe("100%");
  });

  it("should return 480 for standard layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 768,
      height: 1024,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthFormWidth());
    expect(result.current).toBe(480);
  });

  it("should return 600 for wide layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 1200,
      height: 800,
      scale: 1,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthFormWidth());
    expect(result.current).toBe(600);
  });

  it("should return 50% for split layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 1440,
      height: 900,
      scale: 1,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthFormWidth());
    expect(result.current).toBe("100%");
  });
});

describe("useAuthInputSize", () => {
  it("should return medium for compact layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthInputSize());
    expect(result.current).toBe("medium");
  });

  it("should return large for split layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 1440,
      height: 900,
      scale: 1,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthInputSize());
    expect(result.current).toBe("large");
  });
});

describe("useAuthSpacing", () => {
  it("should return correct spacing for compact layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 375,
      height: 667,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthSpacing());

    expect(result.current).toEqual({
      padding: 20,
      gap: 16,
      logoSize: 48,
    });
  });

  it("should return correct spacing for split layout", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 1440,
      height: 900,
      scale: 1,
      fontScale: 1,
    });

    const { result } = renderHook(() => useAuthSpacing());

    expect(result.current).toEqual({
      padding: 44,
      gap: 28,
      logoSize: 80,
    });
  });
});

describe("useShouldShowSocialAuth", () => {
  it("should return true for regular screens", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 768,
      height: 1024,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useShouldShowSocialAuth());
    expect(result.current).toBe(true);
  });

  it("should return false for very small devices", () => {
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 320,
      height: 568,
      scale: 2,
      fontScale: 1,
    });

    const { result } = renderHook(() => useShouldShowSocialAuth());
    expect(result.current).toBe(false);
  });
});
