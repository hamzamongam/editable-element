import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default [
 {
  input: 'src/index.ts',
  output: [
   {
    file: 'dist/umd/editable-element.min.js',
    format: 'iife',
    sourcemap: true,
    name: 'EditableElement',
   },
   {
    file: 'dist/esm/editable-element.js',
    format: 'esm',
    sourcemap: true,
   },
   {
    file: 'dist/cjs/editable-element.js',
    format: 'cjs',
    sourcemap: true,
   },
  ],
  plugins: [
   external(),
   nodeResolve({ browser: true }),
   commonjs(),
   typescript({ tsconfig: './tsconfig.json' }),
   postcss({
    extract: 'style.css', // Outputs CSS to the dist folder
    minimize: true,
    sourceMap: true,
    plugins: [autoprefixer()],
    use: [
     ['sass', { includePaths: ['./src/styles'] }], // SCSS configuration
    ],
   }),
   terser({ compress: true }),
  ],
 },
 {
  input: 'dist/esm/types/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  external: [/\.css$/, /\.scss$/],
  plugins: [dts()],
 },
]
