import hexRgb from 'hex-rgb';
import React, { useState } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';

import { devices } from '../../../config/breakpoints.config';
import { ContactFields, Validator } from '../../../config/form.config';
import { useQuestionnaireContext } from '../context/Questionnaire';
import { Label } from './Label';

const StyledTextInput = styled.div<{ hasError: undefined | string }>`
  position: relative;
  width: 100%;
  max-width: 25rem;

  grid-column: 1 / 3;

  @media screen and (${devices.md}) {
    grid-column: unset;
  }

  &::after {
    content: '${({ hasError }) => (hasError ? hasError : '')}';
    position: absolute;
    bottom: 0.25rem;
    left: 1rem;
    font-size: 0.8rem;
    opacity: 0.75;
    color: red;

    @media screen and (${devices.md}) {
      bottom: 0.25rem;
      left: 1rem;
    }
  }

  input {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.75rem;
    letter-spacing: +1px;
    border-radius: 0.5rem;
    border: 2px solid
      ${({ theme, hasError }) =>
        hasError ? theme.colors.error : theme.colors.tertiary};
    width: 100%;
    transition: box-shadow 0.1s ease-in-out;

    @media screen and (${devices.md}) {
      font-size: 1.125rem;
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

const defaultValidations: Validator[] = [
  { regex: /(.|\s)*\S(.|\s)*/, message: 'Bitte geben Sie einen Wert ein.' },
];

export const TextInput: React.FunctionComponent<{
  field: typeof ContactFields[keyof typeof ContactFields];
  label: string;
  type: string;
  pattern?: string;
  validations?: Validator[];
}> = ({ label, type, field, pattern, validations }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const [error, setError] = useState<undefined | string>(undefined);

  const inputId = slugify(field);
  const value = state.contact[field];

  const validators = validations
    ? [...validations, ...defaultValidations]
    : defaultValidations;

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    dispatch({ type: 'setDetails', payload: { field, value: target.value } });
  };

  const onFocusHandler: React.FocusEventHandler = () => {
    setError(undefined);
  };

  const onBlurHandler: React.FocusEventHandler = () => {
    if (typeof value !== 'string') return;

    validators.some((validator) => {
      const isValid = validator.regex.test(value);
      if (!isValid) {
        setError(validator.message);
        return true;
      }
    });

    dispatch({
      type: 'setDetails',
      payload: { field, value },
    });
  };

  return (
    <StyledTextInput hasError={error}>
      <Label htmlFor={inputId}>{label}</Label>
      <input
        type={type}
        name={inputId}
        id={inputId}
        aria-label={label}
        value={(value as string | undefined) ?? ''}
        pattern={pattern}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        onChange={onChangeHandler}
      />
    </StyledTextInput>
  );
};
