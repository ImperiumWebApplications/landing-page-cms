import type { MouseEvent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import hexRgb from 'hex-rgb';
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
  background: linear-gradient(white 0, white 100%);
  border-radius: 0.5rem;
  box-shadow: 0 5px 5px 0 rgb(0 0 0 / 5%);
  transition: all 0.3s ease-in-out;

  @media screen and (${devices.md}) {
    flex-direction: column;
    justify-content: center;
    width: 12rem;
    height: 12rem;
    padding: 2rem;
    border-radius: 2rem;
    box-shadow: 0 10px 10px 0 rgb(0 0 0 / 5%);
  }

  @media screen and (${devices.xl}) {
    width: 16rem;
    height: 16rem;
  }

  &::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    border-radius: 0.5rem;
    background: linear-gradient(
      180deg,
      ${({ theme }) =>
          hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.5 })}
        0,
      ${({ theme }) => theme.colors.secondary} 100%
    );
    transition: opacity 0.3s ease-in-out;

    @media screen and (${devices.md}) {
      border-radius: 2rem;
    }
  }

  &:hover,
  &[data-selected='true'] {
    &::before {
      opacity: 1;
    }

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
        width: 4rem;
        height: 4rem;
      }

      @media screen and (${devices.xl}) {
        width: 5rem;
        height: 5rem;
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
      width: 4rem;
      height: 4rem;
    }

    @media screen and (${devices.xl}) {
      width: 5rem;
      height: 5rem;
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
      margin-top: 2rem;
    }

    @media screen and (${devices.xl}) {
      font-size: 1.5rem;
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
