import type { MouseEvent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ReactSVG } from 'react-svg';

import type { ImageObject } from '../../backend-api';
import { devices } from '../../config/breakpoints.config';

const StyledSelectableOption = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  background-color: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  @media screen and (${devices.md}) {
    flex-direction: column;
    justify-content: center;
    width: 10rem;
    height: 10rem;
    padding: 1rem;
    border-radius: 1.5rem;
  }

  @media screen and (${devices.lg}) {
    width: 12rem;
    height: 12rem;
    padding: 2rem;
  }

  @media (hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};

      .icon svg,
      .icon svg path {
        fill: white !important;
      }

      .label {
        color: white;
      }

      .icon-placeholder {
        background-color: white;
      }
    }
  }

  &[data-selected='true'] {
    background-color: ${({ theme }) => theme.colors.secondary};

    .icon svg,
    .icon svg path {
      fill: white !important;
    }

    .label {
      color: white;
    }

    .icon-placeholder {
      background-color: white;
    }
  }

  .icon {
    position: relative;
    z-index: 2;

    svg {
      width: 2.5rem;
      height: 2.5rem;

      @media screen and (${devices.md}) {
        width: 3rem;
        height: 3rem;
      }

      @media screen and (${devices.lg}) {
        width: 4rem;
        height: 4rem;
      }
    }

    svg,
    svg path {
      fill: ${({ theme }) => theme.colors.secondary} !important;
    }
  }

  .icon-placeholder {
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
    opacity: 0.125;
    flex-shrink: 0;

    @media screen and (${devices.md}) {
      width: 3rem;
      height: 3rem;
    }

    @media screen and (${devices.lg}) {
      width: 4rem;
      height: 4rem;
    }
  }

  .label {
    position: relative;
    z-index: 2;
    font-size: 1rem;
    font-weight: 700;
    margin-left: 1rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};

    @media screen and (${devices.md}) {
      margin-left: 0;
      margin-top: 1rem;
    }

    @media screen and (${devices.lg}) {
      margin-top: 2rem;
    }

    @media screen and (${devices.xl}) {
      font-size: 1.25rem;
    }
  }
`;

export const SelectableOption: React.FunctionComponent<{
  label: string;
  selected: boolean;
  icon?: ImageObject;
  onSelectHandler: (event: MouseEvent) => void;
}> = ({ label, selected, icon, onSelectHandler }) => {
  const isSvgIcon = icon?.data?.attributes.ext.includes('svg');

  return (
    <StyledSelectableOption
      role="button"
      onClick={onSelectHandler}
      data-selected={selected ? 'true' : 'false'}
    >
      <div className="icon">
        {icon?.data && !isSvgIcon && (
          <Image
            src={icon.data.attributes.url}
            alt={icon.data.attributes.alternativeText}
            width={icon.data.attributes.width}
            height={icon.data.attributes.height}
          />
        )}
        {icon?.data && isSvgIcon && (
          <ReactSVG
            loading={() => <div className="icon-placeholder" />}
            src={icon.data.attributes.url}
          />
        )}
        {!icon?.data && <div className="icon-placeholder" />}
      </div>
      <div className="label">{label}</div>
    </StyledSelectableOption>
  );
};
