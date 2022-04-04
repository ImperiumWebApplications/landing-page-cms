module.exports = {
  '*.js': ['eslint'],
  '*.+(js|jsx|json|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
    'prettier --write',
  ],
};
