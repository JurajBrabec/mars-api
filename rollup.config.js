import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './index.js',
  output: {
    file: './build/index.js',
    format: 'cjs',
    name: 'api',
  },
  plugins: [resolve(), commonjs(), json(), terser()],
};
