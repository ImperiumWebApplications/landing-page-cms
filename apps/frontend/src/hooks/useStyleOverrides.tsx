import { useLayoutEffect } from 'react';

const STYLE_OVERRIDE_DOMAIN_REGEX = /(maklerplan)/;

export const shouldOverrideStyles = () =>
  typeof window !== 'undefined' &&
  STYLE_OVERRIDE_DOMAIN_REGEX.test(window.location.hostname);

export const usePageStyleOverrides = () => {
  useLayoutEffect(() => {
    if (!shouldOverrideStyles()) return;

    const style = document.createElement('style');

    style.innerHTML = `
      div[aria-label="question"] > h2 {
        color: var(--color-secondary) !important;
      }
      a[aria-label="questionnaire-option"] > div + span {
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

export const useIconStyleOverrides = () => {
  useLayoutEffect(() => {
    if (!shouldOverrideStyles()) return;
    document.querySelectorAll('.icon-color-override').forEach((icon) => {
      icon.classList.remove('icon-color-override');
    });
  });
};
