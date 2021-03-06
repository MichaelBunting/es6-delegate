import babel from 'rollup-plugin-babel';

export default {
  input: 'delegate.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
