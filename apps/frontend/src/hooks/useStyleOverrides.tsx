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
      [role="button"] .icon svg,
      [role="button"] .icon svg path,
      [role="button"] .icon svg polygon,
      [role="button"] .icon svg circle,
      [role="button"] .icon svg line,
      [role="button"] .icon svg polyline,
      [role="button"] .icon svg rect,
      [role="button"] .icon svg ellipse {
        fill: var(--color-secondary) !important;
      }
      [role="button"] .icon[data-selected='true'] svg,
      [role="button"] .icon[data-selected='true'] svg path,
      [role="button"] .icon[data-selected='true'] svg polygon,
      [role="button"] .icon[data-selected='true'] svg circle,
      [role="button"] .icon[data-selected='true'] svg line,
      [role="button"] .icon[data-selected='true'] svg polyline,
      [role="button"] .icon[data-selected='true'] svg rect,
      [role="button"] .icon[data-selected='true'] svg ellipse {
        fill: var(--color-secondary) !important;
      }
      [role="button"] .icon:active svg,
      [role="button"] .icon:active svg path,
      [role="button"] .icon:active svg polygon,
      [role="button"] .icon:active svg circle,
      [role="button"] .icon:active svg line,
      [role="button"] .icon:active svg polyline,
      [role="button"] .icon:active svg rect,
      [role="button"] .icon:active svg ellipse {
        fill: var(--color-secondary) !important;
      }
      [role="button"] .group:hover .icon svg,
      [role="button"] .group:hover .icon svg path,
      [role="button"] .group:hover .icon svg polygon,
      [role="button"] .group:hover .icon svg circle,
      [role="button"] .group:hover .icon svg line,
      [role="button"] .group:hover .icon svg polyline,
      [role="button"] .group:hover .icon svg rect,
      [role="button"] .group:hover .icon svg ellipse {
        fill: var(--color-secondary) !important;
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
