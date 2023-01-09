module.exports = {
  presets: [
    'next/babel',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          node: '10',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
