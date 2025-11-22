/**
 * Custom Jest resolver that resolves @/ paths based on test file location
 * This allows each package to have its own @/ mapping
 * Works with jest-expo by using the defaultResolver from react-native/jest/resolver
 */

const path = require("path");
const fs = require("fs");

// Get the default resolver from react-native (used by jest-expo)
let defaultResolver;
try {
  defaultResolver = require("react-native/jest/resolver");
} catch (e) {
  // Fallback if react-native resolver is not available
  defaultResolver = require("jest-resolve").default;
}

module.exports = (request, options) => {
  // Use default resolver for non-@/ imports
  if (!request.startsWith("@/")) {
    return defaultResolver(request, options);
  }

  // Get the test file path - this is the file that's importing
  const testFilePath = options.basedir || "";
  
  // Extract the path after @/
  const importPath = request.substring(2); // Remove "@/"
  
  // Determine which package this test belongs to based on the test file path
  let packageRoot = null;
  
  // Normalize paths for comparison
  const normalizedPath = testFilePath.replace(/\\/g, "/");
  
  if (normalizedPath.includes("/packages/auth/")) {
    packageRoot = path.join(__dirname, "packages", "auth");
  } else if (normalizedPath.includes("/packages/full/")) {
    packageRoot = path.join(__dirname, "packages", "full");
  } else if (normalizedPath.includes("/packages/basic/")) {
    packageRoot = path.join(__dirname, "packages", "basic");
  } else if (normalizedPath.includes("/packages/shared/core/")) {
    packageRoot = path.join(__dirname, "packages", "shared", "core", "src");
  } else if (normalizedPath.includes("/packages/shared/auth/")) {
    packageRoot = path.join(__dirname, "packages", "shared", "auth", "src");
  }
  
  // If we found a package root, try to resolve the import
  if (packageRoot) {
    const resolvedPath = path.join(packageRoot, importPath);
    
    // Use defaultResolver to handle extensions and module resolution
    try {
      return defaultResolver(resolvedPath, options);
    } catch (e) {
      // If that fails, try with common extensions
      const extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];
      for (const ext of extensions) {
        const fullPath = resolvedPath + ext;
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
      
      // Try as a directory with index file
      for (const ext of extensions) {
        const indexPath = path.join(resolvedPath, "index" + ext);
        if (fs.existsSync(indexPath)) {
          return indexPath;
        }
      }
    }
  }
  
  // Fallback to default resolver (will likely fail, but gives better error)
  return defaultResolver(request, options);
};

