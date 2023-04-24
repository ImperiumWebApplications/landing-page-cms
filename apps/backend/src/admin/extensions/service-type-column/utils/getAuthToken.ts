// https://github.com/strapi/strapi/blob/main/packages/core/helper-plugin/src/utils/auth/index.js#L72

const TOKEN_KEY = 'jwtToken';

export const getAuthToken = () => {
  if (localStorage && localStorage.getItem(TOKEN_KEY)) {
    return JSON.parse(localStorage.getItem(TOKEN_KEY)) || null;
  }

  if (sessionStorage && sessionStorage.getItem(TOKEN_KEY)) {
    return JSON.parse(sessionStorage.getItem(TOKEN_KEY)) || null;
  }

  return null;
};
