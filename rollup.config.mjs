/* eslint-disable import/no-extraneous-dependencies */
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'

export default [
 {
  input: 'src/index.ts',
  output: [
   {
    file: 'dist/umd/editable-element.min.js',
    format: 'umd',
    sourcemap: false,
    name: 'EditableElement',
   },
   {
    file: 'dist/esm/editable-element.js',
    format: 'esm',
    sourcemap: false,
   },
  ],
  plugins: [
   //    eslint({ fix: true }),
   external(),
   nodeResolve({ browser: true }),
   commonjs(),
   replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
   }),
   typescript({ tsconfig: './tsconfig.json' }),
   postcss({ extract: 'style.css' }),
   terser({ compress: true }),
  ],
  //   external: ['react', 'react-dom', 'process'],
 },
 {
  input: 'dist/esm/types/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  external: [/\.css$/, /\.scss$/],
  plugins: [
   dts(),
   url({
    include: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
    destDir: 'dist/images',
   }),
  ],
 },
]
