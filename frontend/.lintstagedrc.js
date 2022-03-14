module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn check-types',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn lint --fix ${filenames.join(' ')}`,
    `yarn format --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|mdx|json)': (filenames) =>
    `yarn format --write ${filenames.join(' ')}`,
};
