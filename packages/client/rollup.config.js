import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';


import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      minifyInternalExports: true,
      sourcemap: true,
    },
    {
      file: "dist/index.mjs",
      format: "esm",
      minifyInternalExports: true,
      sourcemap: true,
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "index",
      minifyInternalExports: true,
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    typescript(),

    nodePolyfills(),
    nodeGlobals(),
    nodeBuiltins(),

    babel({
      babelHelpers: "bundled",
      compact: true,
    }),
    terser(),
  ],
};
