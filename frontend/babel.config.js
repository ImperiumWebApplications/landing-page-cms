module.exports = {
  presets: [
    'next/babel',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: '> 0.25%, not dead',
      },
    ],
  ],
  plugins: [['styled-components', { ssr: true }]],
};
