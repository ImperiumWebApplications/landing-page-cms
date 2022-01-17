export const setBrowserHistory = <T>(state: T) => {
  if (typeof window === 'undefined') return;
  window.history.pushState(state, '');
};
