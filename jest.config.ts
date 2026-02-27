import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/**/*.test.[tj]s?(x)"],
};

export default createJestConfig(customJestConfig);
