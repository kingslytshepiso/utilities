// Mock for expo - prevent Winter runtime issues
global.__ExpoImportMetaRegistry = {};

module.exports = {
  registerRootComponent: () => {},
};
