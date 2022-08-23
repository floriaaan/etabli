import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

export default {
  input: "index.ts",
  output: {
    file: "dist/index.js",
    format: "esm",
    minifyInternalExports: true,
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: false,
      preferBuiltins: true,
      extensions: [".js", ".ts"],
    }),
    json(),
    typescript(),
    commonjs(),
  ],

  external: ["chalk"],
};
