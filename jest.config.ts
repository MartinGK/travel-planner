import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  fakeTimers: { enableGlobally: true },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["node_modules", "./tests/e2e"],
};

export default config;
