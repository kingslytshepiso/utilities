// Mock for expo-router
/* global jest */
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  canGoBack: jest.fn(() => true),
  setParams: jest.fn(),
};

const mockPathname = "/";

module.exports = {
  router: mockRouter,
  useRouter: jest.fn(() => mockRouter),
  usePathname: jest.fn(() => mockPathname),
  useLocalSearchParams: jest.fn(() => ({})),
  useGlobalSearchParams: jest.fn(() => ({})),
  useSegments: jest.fn(() => []),
  Stack: {
    Screen: ({ children }) => children,
  },
  Tabs: {
    Screen: ({ children }) => children,
  },
  Link: ({ children }) => children,
  Redirect: () => null,
};
