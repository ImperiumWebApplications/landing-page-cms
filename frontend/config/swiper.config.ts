import { css } from 'styled-components';

/**
 * Activated modules: core – a11y – navigation – pagination
 * CSS imports via _app.tsx: core – a11y – pagination
 * Custom CSS in this file: navigation
 */

export const swiperNavigationCss = (arrowColor?: string) => css`
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: calc(50% - 32px);
      backdrop-filter: blur(0.5rem);
      border-radius: ${({ theme }) => theme.borderRadius};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 64px;
      z-index: 15;
      cursor: pointer;

      &:after {
        content: '';
        background-color: ${({ theme }) => arrowColor ?? theme.colors.tertiary};
        height: 48px;
        width: 48px;
      }
    }

    .swiper-button-prev {
      left: 0;

      &:after {
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 0 24 24' width='48px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M14.91 6.71c-.39-.39-1.02-.39-1.41 0L8.91 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L11.03 12l3.88-3.88c.38-.39.38-1.03 0-1.41z'/%3E%3C/svg%3E");
      }
    }

    .swiper-button-next {
      right: 0;

      &:after {
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 0 24 24' width='48px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M9.31 6.71c-.39.39-.39 1.02 0 1.41L13.19 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01z'/%3E%3C/svg%3E");
      }
    }
  }
`;
