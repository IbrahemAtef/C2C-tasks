const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["**/__tests__/**/*.test.ts"], // only files ending with .test.ts
  detectOpenHandles: true,
  testTimeout: 30000,
  globalTeardown: "./src/__tests__/setup/global.teardown.ts",
  coverageDirectory: "./coverage",
};
