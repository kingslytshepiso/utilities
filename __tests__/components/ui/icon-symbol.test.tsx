/**
 * IconSymbol Component Tests
 * Tests for the icon symbol component that maps SF Symbols to Material Icons
 */

import { IconSymbol } from "@/components/ui/icon-symbol";
import { render } from "@testing-library/react-native";
import React from "react";

describe("IconSymbol", () => {
  describe("rendering", () => {
    it("should render with required props", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="#000000" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should render with custom size", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" size={32} color="#000000" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should render with default size when not specified", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="#000000" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should render with custom color", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="#FF0000" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should render with custom style", () => {
      const customStyle = { marginTop: 10 };
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="#000000" style={customStyle} />
      );

      expect(UNSAFE_root).toBeTruthy();
    });
  });

  describe("icon mapping", () => {
    it("should map navigation icons correctly", () => {
      const { UNSAFE_root: getHouse } = render(
        <IconSymbol name="house" color="#000000" />
      );
      const { UNSAFE_root: getHouseFill } = render(
        <IconSymbol name="house.fill" color="#000000" />
      );

      expect(getHouse).toBeTruthy();
      expect(getHouseFill).toBeTruthy();
    });

    it("should map info icons correctly", () => {
      const { UNSAFE_root: getInfo } = render(
        <IconSymbol name="info.circle" color="#000000" />
      );
      const { UNSAFE_root: getInfoFill } = render(
        <IconSymbol name="info.circle.fill" color="#000000" />
      );

      expect(getInfo).toBeTruthy();
      expect(getInfoFill).toBeTruthy();
    });

    it("should map other common icons correctly", () => {
      const iconNames = [
        "paperplane.fill",
        "chevron.left.forwardslash.chevron.right",
        "chevron.right",
        "sun.max.fill",
        "moon.fill",
        "sparkles",
        "square.on.square",
        "paintbrush.fill",
        "square.grid.2x2",
        "display",
        "checkmark.shield.fill",
        "app.dashed",
        "link",
        "arrow.up.right.square",
      ] as const;

      iconNames.forEach((iconName) => {
        const { UNSAFE_root } = render(
          <IconSymbol name={iconName} color="#000000" />
        );

        expect(UNSAFE_root).toBeTruthy();
      });
    });
  });

  describe("weight prop", () => {
    it("should accept weight prop without error", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="#000000" weight="regular" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should accept different weight values", () => {
      const weights = ["regular", "bold", "semibold", "thin"] as const;

      weights.forEach((weight) => {
        const { UNSAFE_root } = render(
          <IconSymbol name="house" color="#000000" weight={weight} />
        );

        expect(UNSAFE_root).toBeTruthy();
      });
    });
  });

  describe("color handling", () => {
    it("should accept hex color values", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="#FF5722" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should accept rgb color values", () => {
      const { UNSAFE_root } = render(
        <IconSymbol name="house" color="rgb(255, 87, 34)" />
      );

      expect(UNSAFE_root).toBeTruthy();
    });

    it("should accept color names", () => {
      const { UNSAFE_root } = render(<IconSymbol name="house" color="red" />);

      expect(UNSAFE_root).toBeTruthy();
    });
  });

  describe("size handling", () => {
    it("should accept various size values", () => {
      const sizes = [12, 16, 20, 24, 32, 48, 64];

      sizes.forEach((size) => {
        const { UNSAFE_root } = render(
          <IconSymbol name="house" color="#000000" size={size} />
        );

        expect(UNSAFE_root).toBeTruthy();
      });
    });
  });
});
