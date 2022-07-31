const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleDirectories: ["node_modules", __dirname],
  //ignore node_modules and dist
  testMatch: ["**/tests/**/*.test.ts"],
};
