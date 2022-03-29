import React from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import { ChevronDown } from '@styled-icons/evaicons-solid';

import type { TextFields } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { devices } from '../../config/breakpoints.config';
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
      opacity: 0.8;
      cursor: no-drop;

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
  field: keyof TextFields;
  label: string;
  options: string[];
  disabled?: boolean;
}> = ({ field, label, options, disabled }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const inputId = slugify(field);

  const currentValue = state.contact[field].value;

  const setFieldValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: 'SET_CONTACT_DETAILS',
        payload: { field, value },
      });
    },
    [dispatch, field],
  );

  // If the select box enables itself with new options, check if
  // the value has changed. If so, update the context state.
  React.useEffect(() => {
    if (!disabled && options.length && options[0] !== currentValue)
      setFieldValue(options[0]);
  }, [disabled, options, setFieldValue, currentValue]);

  return (
    <StyledSelectInput>
      <Label htmlFor={inputId}>{label}</Label>
      <select
        id={inputId}
        disabled={disabled}
        value={currentValue}
        onChange={(e) => setFieldValue(e.target.value)}
      >
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <ChevronDown />
    </StyledSelectInput>
  );
};
