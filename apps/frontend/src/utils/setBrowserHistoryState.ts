export const setBrowserHistoryState = (payload: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    window.history.pushState(
      {
        ...window.history.state,
        options: {
          ...(window.history.state?.options ?? {}),
          ...payload,
        },
      },
      '',
    );
  }
};
