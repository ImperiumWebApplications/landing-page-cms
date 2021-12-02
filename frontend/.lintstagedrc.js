module.exports = {
  '**/*.js?(x)': (filenames) =>
    `next lint --fix --file ${filenames.map((file) => file.split(process.cwd())[1]).join(' --file ')}`,
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': ['prettier --write'],
};
