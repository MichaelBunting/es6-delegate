import babel from 'rollup-plugin-babel';

export default {
  input: 'delegate.js',
  output: {
    file: 'index.js',
    format: 'es',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
