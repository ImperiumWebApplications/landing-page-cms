module.exports = {
  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format other files
  '**/*.(json|yml|yaml|css|less|scss|md|graphql|mdx)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
