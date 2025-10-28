import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    // Additional ignores
    "dist/**",
    "coverage/**",
    "docs/**",
    "tmp/**",
    "temp/**",
    "AI-WONDERLAND-INNOVATION-/**",
    "*.config.js",
    "!jest.config.js",
  ]),
  // Backend CommonJS files configuration
  {
    files: ["src/**/*.js", "tests/**/*.js", "scripts/**/*.js", "examples/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-console": "off",
    },
  },
]);

export default eslintConfig;
