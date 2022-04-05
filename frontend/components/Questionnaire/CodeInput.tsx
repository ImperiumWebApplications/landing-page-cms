import React from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import CodeInputField from 'react-auth-code-input';

import type { ContactFields } from '../../config/form.config';
import type { TextFields } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { setNativeValue } from '../../utils/setNativeValue';
import { Label } from './Label';

const StyledCodeInput = styled.div<{ hasError: boolean }>`
  input {
    width: 3rem;
    height: 3.5rem;
    padding: 0;
    font-size: 1.5rem;
    text-align: center;
    margin-right: 0rem;
    text-transform: uppercase;
    background: #ffffff;
    background-clip: padding-box;
    border: 2px solid
      ${({ theme, hasError }) =>
        hasError ? theme.colors.error : theme.colors.tertiary};

    border-right-width: 0px;
    border-left-width: 1px;

    &:first-of-type {
      border-left-width: 2px;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }

    &:last-of-type {
      border-right-width: 2px;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    &:focus-visible {
      outline-offset: -1px;
      outline-color: ${({ theme }) => theme.colors.secondary};
      outline-width: 1px;
    }

    // Disable default browser styling for number inputs
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

export const CodeInput: React.FunctionComponent<{
  type: 'numeric' | 'alpha' | 'alphanumeric';
  field: Extract<keyof TextFields, ContactFields.PostalCode>;
  label: string;
  length: number;
  error?: string | undefined;
}> = ({ field, type, label, length, error }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const inputId = slugify(label);

  const setFieldValue = (value: string) => {
    dispatch({
      type: 'SET_CONTACT_DETAILS',
      payload: { field, value },
    });
  };

  // Set values natively since 'react-auth-code-input' does
  // not expose a value prop to set the initial value.
  React.useLayoutEffect(() => {
    const { label, value } = state.contact.postalCode;
    if (!value) return;

    const values = value.split('');
    const query = `[aria-label*="${label}."]`;
    const inputs = document.querySelectorAll<HTMLInputElement>(query);
    inputs.forEach((input, i) => setNativeValue(input, values[i]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledCodeInput hasError={!!error}>
      <Label htmlFor={inputId}>{label}</Label>
      <CodeInputField
        ariaLabel={label}
        onChange={setFieldValue}
        length={length}
        allowedCharacters={type}
      />
    </StyledCodeInput>
  );
};
