import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];

export default {
    input: 'src/index.tsx',
    output: {
        file: 'public/index.js',
        format: 'iife',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        }),
        resolve({
            extensions,
        }),
        babel({
            extensions,
            exclude: /node_modules/,
            babelHelpers: 'runtime',
            presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins: [
                'react-require',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                ['@babel/plugin-proposal-object-rest-spread', {
                    useBuiltIns: true,
                }],
                ['@babel/plugin-transform-runtime', {
                    corejs: 3,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                }],
            ],
        }),
        (isProd && terser()),
    ],
};
