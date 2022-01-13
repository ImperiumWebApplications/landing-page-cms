import hexRgb from 'hex-rgb';
import React from 'react';
import slugify from 'slugify';
import styled from 'styled-components';

import type { ContactData } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { devices } from '../../config/breakpoints.config';

const StyledTextInput = styled.div`
  grid-column: 1 / 3;

  @media screen and (${devices.md}) {
    grid-column: unset;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    letter-spacing: +0.25px;

    @media screen and (${devices.md}) {
      margin-bottom: 0.75rem;
    }
  }
  input {
    padding: 1rem 0.75rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    letter-spacing: +1px;
    border-radius: 0.5rem;
    border: 2px solid ${({ theme }) => theme.colors.tertiary};
    width: calc(100% - 1.25rem * 2);
    transition: box-shadow 0.1s ease-in-out;

    @media screen and (${devices.md}) {
      padding: 1.5rem 1.25rem;
    }

    &:hover,
    &:active,
    &:focus {
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.tertiary},
        0 0 0 3px
          ${({ theme }) =>
            hexRgb(theme.colors.secondary, { format: 'css', alpha: 0.5 })};
    }
  }
`;

export const TextInput: React.FunctionComponent<{
  label: string;
  type: string;
  field: keyof ContactData;
  initialValue: string;
  pattern?: string;
}> = ({ label, type, field, initialValue, pattern }) => {
  const { dispatch } = useQuestionnaireContext();
  const [value, setValue] = React.useState(initialValue);
  const inputId = slugify(field);

  const onBlurHandler: React.FocusEventHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SET_CONTACT_DETAILS',
      payload: { field, value },
    });
  };

  return (
    <StyledTextInput>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        name={inputId}
        id={inputId}
        aria-label={label}
        value={value}
        pattern={pattern}
        onBlur={onBlurHandler}
        onChange={(e) => setValue(e.target.value)}
      />
    </StyledTextInput>
  );
};
