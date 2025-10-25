// Mock for expo-web-browser
module.exports = {
  openAuthSessionAsync: () => Promise.resolve({ type: "cancel" }),
  maybeCompleteAuthSession: () => {},
  warmUpAsync: () => Promise.resolve(),
  coolDownAsync: () => Promise.resolve(),
};
