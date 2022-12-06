import React, { useEffect } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import { ChevronDown } from '@styled-icons/evaicons-solid';

import { devices } from '../../../config/breakpoints.config';
import { ContactFields } from '../../../components/Form/Form.config';
import { useQuestionnaireContext } from '../context/Questionnaire';
import { Label } from './Label';

const StyledSelectInput = styled.div`
  position: relative;
  min-width: 12.5rem;

  select {
    -webkit-appearance: none;
    padding: 0.75rem 3rem 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.75rem;
    letter-spacing: +1px;
    border-radius: 0.5rem;
    border: 2px solid ${({ theme }) => theme.colors.tertiary};
    width: 100%;
    background: #fff;
    cursor: pointer;
    transition: all 150ms ease;

    &:focus,
    &:hover {
      outline: none;
      border-color: ${({ theme }) => theme.colors.text};
    }

    &:hover + svg {
      fill: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      cursor: not-allowed;
      filter: brightness(95%);

      &:hover {
        border-color: ${({ theme }) => theme.colors.tertiary};
        & + svg {
          fill: ${({ theme }) => theme.colors.text};
        }
      }
    }

    &[data-loading='true'] {
      cursor: not-allowed;
      filter: brightness(98%);
      color: grey;

      position: relative;
      animation-name: shimmer;
      animation-duration: 1.5s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      background-size: 1000px 640px;
      background: ${({ theme }) => `linear-gradient(
      to right,
      ${theme.colors.tertiary} 8%,
      #F8F8F8 38%,
      ${theme.colors.tertiary} 54%
    )`};

      @keyframes shimmer {
        0% {
          background-position: -468px 0;
        }
        100% {
          background-position: 468px 0;
        }
      }

      &:hover {
        border-color: ${({ theme }) => theme.colors.tertiary};
        & + svg {
          fill: ${({ theme }) => theme.colors.text};
        }
      }
    }
  }

  svg {
    position: absolute;
    right: 0.5rem;
    top: calc(50% - 0.5rem);
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.colors.text};

    @media screen and (${devices.md}) {
      top: calc(50% - 0.125rem);
    }
  }
`;

export const SelectInput: React.FunctionComponent<{
  field: typeof ContactFields[keyof typeof ContactFields];
  label: string;
  options: string[];
  isLoading?: boolean;
  disabled?: boolean;
}> = ({ field, label, options, isLoading, disabled }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const inputId = slugify(field);

  const currentValue = state.contact[field] as string | undefined;

  const setFieldValue = React.useCallback(
    (value: string) => {
      dispatch({ type: 'setDetails', payload: { field, value } });
    },
    [dispatch, field],
  );

  useEffect(() => {
    if (options.length && !currentValue) setFieldValue(options?.[0]);
  }, [options, currentValue, setFieldValue]);

  return (
    <StyledSelectInput>
      <Label htmlFor={inputId}>{label}</Label>
      <select
        id={inputId}
        name={inputId}
        disabled={disabled}
        value={currentValue}
        data-loading={isLoading}
        onChange={(e) => setFieldValue(e.target.value)}
      >
        {isLoading ? (
          <option>Wird geladen...</option>
        ) : (
          options.map((option, i) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })
        )}
      </select>
      <ChevronDown />
    </StyledSelectInput>
  );
};
