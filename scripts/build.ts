import path from 'path';
import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, '..', 'src', 'index.ts')],
  outfile: path.resolve(__dirname, '..', 'index.js'),
  target: 'es2020',
  format: 'cjs',
  minify: true,
});
