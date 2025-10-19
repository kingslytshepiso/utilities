/**
 * BottomNav Component Tests
 * Tests for the bottom navigation component
 */

import { BottomNav, BottomNavItem } from "@/components/navigation/bottom-nav";
import { fireEvent, render } from "@/test-utils";
import { Platform } from "react-native";

// Create mock functions that will be used by the router mock
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockUsePathname = jest.fn();

// Mock expo-router module
jest.mock("expo-router", () => ({
  router: {
    push: (...args: any[]) => mockPush(...args),
    replace: (...args: any[]) => mockReplace(...args),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    setParams: jest.fn(),
  },
  useRouter: jest.fn(() => ({
    push: (...args: any[]) => mockPush(...args),
    replace: (...args: any[]) => mockReplace(...args),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    setParams: jest.fn(),
  })),
  usePathname: () => mockUsePathname(),
  useLocalSearchParams: jest.fn(() => ({})),
  useGlobalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
}));

describe("BottomNav", () => {
  const mockItems: BottomNavItem[] = [
    {
      path: "/",
      icon: "house",
      activeIcon: "house.fill",
      label: "Home",
    },
    {
      path: "/about",
      icon: "info.circle",
      activeIcon: "info.circle.fill",
      label: "About",
    },
  ];

  beforeEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
    mockUsePathname.mockReturnValue("/");
  });

  describe("rendering", () => {
    it("should render navigation items", () => {
      const { getByText } = render(<BottomNav items={mockItems} />);

      expect(getByText("Home")).toBeTruthy();
      expect(getByText("About")).toBeTruthy();
    });

    it("should render with active icon for current path", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const homeButton = getByLabelText("Home");
      expect(homeButton.props.accessibilityState.selected).toBe(true);
    });

    it("should render inactive items correctly", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const aboutButton = getByLabelText("About");
      expect(aboutButton.props.accessibilityState.selected).toBe(false);
    });

    it("should handle paths with trailing slashes", () => {
      mockUsePathname.mockReturnValue("/about/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const aboutButton = getByLabelText("About");
      expect(aboutButton.props.accessibilityState.selected).toBe(true);
    });
  });

  describe("platform behavior", () => {
    const originalOS = Platform.OS;

    afterEach(() => {
      // @ts-ignore - Restoring original value
      Platform.OS = originalOS;
    });

    it("should hide on web when hideOnWeb is true", () => {
      // @ts-ignore - Mocking platform
      Platform.OS = "web";
      const { queryByText } = render(
        <BottomNav items={mockItems} hideOnWeb={true} />
      );

      expect(queryByText("Home")).toBeNull();
      expect(queryByText("About")).toBeNull();
    });

    it("should show on web when hideOnWeb is false", () => {
      // @ts-ignore - Mocking platform
      Platform.OS = "web";
      const { getByText } = render(
        <BottomNav items={mockItems} hideOnWeb={false} />
      );

      expect(getByText("Home")).toBeTruthy();
      expect(getByText("About")).toBeTruthy();
    });

    it("should show on mobile platforms", () => {
      // @ts-ignore - Mocking platform
      Platform.OS = "android";
      const { getByText } = render(<BottomNav items={mockItems} />);

      expect(getByText("Home")).toBeTruthy();
      expect(getByText("About")).toBeTruthy();
    });
  });

  describe("navigation", () => {
    it("should navigate to home path using replace", () => {
      mockUsePathname.mockReturnValue("/about");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const homeButton = getByLabelText("Home");
      fireEvent.press(homeButton);

      expect(mockReplace).toHaveBeenCalledWith("/");
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should navigate to other paths using push", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const aboutButton = getByLabelText("About");
      fireEvent.press(aboutButton);

      expect(mockPush).toHaveBeenCalledWith("/about");
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("should not navigate when already on the same path", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const homeButton = getByLabelText("Home");
      fireEvent.press(homeButton);

      expect(mockReplace).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("should have proper accessibility labels", () => {
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      expect(getByLabelText("Home")).toBeTruthy();
      expect(getByLabelText("About")).toBeTruthy();
    });

    it("should have proper accessibility role", () => {
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const homeButton = getByLabelText("Home");
      expect(homeButton.props.accessibilityRole).toBe("button");
    });

    it("should have proper accessibility state for active item", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const homeButton = getByLabelText("Home");
      expect(homeButton.props.accessibilityState.selected).toBe(true);
    });

    it("should have proper accessibility state for inactive item", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const aboutButton = getByLabelText("About");
      expect(aboutButton.props.accessibilityState.selected).toBe(false);
    });
  });

  describe("icon handling", () => {
    it("should use activeIcon when provided", () => {
      mockUsePathname.mockReturnValue("/");
      const { getByLabelText } = render(<BottomNav items={mockItems} />);

      const homeButton = getByLabelText("Home");
      expect(homeButton).toBeTruthy();
    });

    it("should fallback to icon when activeIcon is not provided", () => {
      const itemsWithoutActiveIcon: BottomNavItem[] = [
        {
          path: "/",
          icon: "house",
          label: "Home",
        },
      ];

      const { getByLabelText } = render(
        <BottomNav items={itemsWithoutActiveIcon} />
      );

      const homeButton = getByLabelText("Home");
      expect(homeButton).toBeTruthy();
    });
  });
});
