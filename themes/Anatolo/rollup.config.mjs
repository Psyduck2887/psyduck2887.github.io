import resolve from '@rollup/plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import { defineConfig } from 'rollup';
import swc from 'unplugin-swc';
import { writeFileSync } from 'node:fs';
import { resolve as resolvePath } from 'node:path';

export default defineConfig([
  // browser-friendly UMD build
  {
    input: 'src/main.ts',
    output: {
      name: 'main.js',
      file: 'source/js_complied/bundle.js',
      // format: 'umd',
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      swc.rollup({
        minify: true,
        jsc: {
          baseUrl: import.meta.dirname || '.',
          paths: {
            '@/*': ['./src/*'],
          },
        },
      }),
      sass({
        output(_styles, styleNodes) {
          const orderedStyles = [...styleNodes].sort((left, right) => {
            const leftIsArchiveTheme = left.id.endsWith('archive-theme.scss');
            const rightIsArchiveTheme = right.id.endsWith('archive-theme.scss');
            return Number(leftIsArchiveTheme) - Number(rightIsArchiveTheme);
          });

          writeFileSync(
            resolvePath(import.meta.dirname || '.', 'source/js_complied/bundle.css'),
            orderedStyles.map(({ content }) => content).join('\n'),
          );
        },
      }),
    ],
  },
]);
