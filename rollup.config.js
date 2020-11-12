import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser } from 'rollup-plugin-terser';
import { camelCase } from 'lodash';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';



export default {
    input: './src/index.ts',
    output: [
        { file: pkg.main, name: camelCase(pkg.name), exports:"named", format: 'cjs', sourcemap: true },
        { file: pkg.module, name: camelCase(pkg.name), format: 'es', sourcemap: true },
        { file: pkg.browser, name: camelCase(pkg.name), format: 'umd', sourcemap: true }
    ],
    watch: {
        include: 'src/**',
    },
    plugins: [
        json(),
        typescript({
            exclude: 'node_modules/**',
        }), 
        nodeResolve(),
        commonjs(),        
        terser()
    ]
}