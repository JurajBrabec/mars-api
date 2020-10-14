import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './api.js',
  output: {
    file: './build/api.js',
    format: 'cjs',
    name: 'api',
  },
  plugins: [resolve(), commonjs(), json(), terser()],
};
