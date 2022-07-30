module.exports = {
  transform: {
    "\\.(ts)$": "ts-jest",
  },

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  //ignore node_modules and dist
  testMatch: ["**/tests/**/*.test.ts"],
};
