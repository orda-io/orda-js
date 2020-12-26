import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

export default {
  input: './dist/ortoo.js',
  plugins: [
    resolve({
      preferBuiltins: true,
      mainFields: ['browser'],
    }),
    commonjs({ extensions }),
    nodePolyfills(),
    terser(),
  ],
  output: [
    {
      file: './example/ortoo.umd.js',
      format: 'umd',
      name: 'ortoo',
    },
  ],
};
