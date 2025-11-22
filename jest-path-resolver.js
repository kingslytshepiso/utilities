/**
 * Helper module for resolving @/ paths in Jest moduleNameMapper
 * This is used as a workaround since Jest's moduleNameMapper doesn't support arrays
 */

const path = require("path");
const fs = require("fs");

// This function will be called by Jest to resolve @/ paths
// It tries multiple package locations in order
function resolveAtPath(importPath) {
  const rootDir = path.join(__dirname);
  const packages = [
    path.join(rootDir, "packages", "auth"),
    path.join(rootDir, "packages", "full"),
    path.join(rootDir, "packages", "basic"),
    path.join(rootDir, "packages", "shared", "core", "src"),
  ];

  for (const packageRoot of packages) {
    const resolvedPath = path.join(packageRoot, importPath);
    const extensions = [".ts", ".tsx", ".js", ".jsx", ".json"];
    
    // Try with extensions
    for (const ext of extensions) {
      const fullPath = resolvedPath + ext;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    
    // Try as directory with index
    for (const ext of extensions) {
      const indexPath = path.join(resolvedPath, "index" + ext);
      if (fs.existsSync(indexPath)) {
        return indexPath;
      }
    }
  }
  
  // Fallback - return a path that will cause a clear error
  return path.join(rootDir, "packages", "shared", "core", "src", importPath);
}

module.exports = resolveAtPath;

