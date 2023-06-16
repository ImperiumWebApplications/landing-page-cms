import { useLayoutEffect } from 'react';

const STYLE_OVERRIDE_DOMAIN_REGEX = /(maklerplan)/;

export const useStyleOverrides = () => {
  useLayoutEffect(() => {
    if (!STYLE_OVERRIDE_DOMAIN_REGEX.test(window.location.hostname)) return;

    const style = document.createElement('style');

    style.innerHTML = `
      div[aria-label="question"] > h2 {
        color: var(--color-secondary) !important;
      }
      footer {
        background-color: var(--color-secondary) !important;
      }
      footer nav a,
      footer nav button {
        color: white !important;
      }
    `.trim();

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);
};
