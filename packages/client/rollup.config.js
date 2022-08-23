import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

export default {
  input: "index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    minifyInternalExports: true,
    sourcemap: true,
  },
  plugins: [
    commonjs({
      include: "node_modules/**",
    }),
    resolve({
      module: true,
      jsnext: true,
      browser: false,
      preferBuiltins: true,
    }),
    json(),
    typescript(),
  ],
  external: ["chalk",],
};
