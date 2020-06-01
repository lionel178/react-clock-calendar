/*
 * @Author: LionelLc
 * @Date: 2020-05-29 11:43:41
 * @LastEditors: LionelLc
 */ 

import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const postcssAdaptive = require('postcss-adaptive');

const pkg = require('./package.json');

const libraryName = 'react-clock-calendar';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.umd,
      name: libraryName,
      format: 'umd',
      globals: { react: 'React', 'react-dom': 'ReactDOM', crypto: 'crypto' },
    },
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'cjs' },
  ],
  plugins: [
    postcss({
      extensions: ['.less', '.css'],
      plugins: [
        autoprefixer({ overrideBrowserslist: ['> 1%', 'last 7 versions', 'iOS > 7', 'Android >= 4.0'] }),
        postcssAdaptive({
          remUnit: 37.5,
          autoRem: true,
        }),
        cssnano,
      ],
      extract: pkg.style,
    }),
    json(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    // commonjs({
    //   include: 'node_modules/**',
    //   namedExports: {
    //     'node_modules/react/index.js': ['useMemo', 'useState', 'memo'],
    //   },
    // }),
    // resolve({ preferBuiltins: false }),
    // terser(),
  ],
};
