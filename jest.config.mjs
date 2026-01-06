import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["./jest/jest.setup.ts"],
  setupFiles: ["./jest/jest.polyfils.ts"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  // Coverage configuration
  collectCoverageFrom: [
    "hooks/**/*.{ts,tsx}",
    "contexts/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "source/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  coverageReporters: ["text", "text-summary", "lcov"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
