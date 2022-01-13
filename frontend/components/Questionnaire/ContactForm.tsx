import React from 'react';
import styled from 'styled-components';

import type { ContactData } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { StyledStepTitle } from './StepTitle';
import { TextInput } from './TextInput';
import { RadioInput } from './RadioInput';
import { CheckboxInput } from './CheckboxInput';
import { QualityBadges } from './QualityBadges';
import { devices } from '../../config/breakpoints.config';

const StyledContactForm = styled.div`
  max-width: 55rem;
  margin: 0 auto;

  form .input-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    column-gap: 2rem;
    row-gap: 2rem;

    @media screen and (${devices.md}) {
      column-gap: 3rem;
      row-gap: 3rem;
    }
  }

  button {
    display: block;
    width: 100%;
    margin: 4rem auto;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ color, theme }) => color ?? theme.colors.primary};
    font: ${({ theme }) => theme.font};
    color: white;
    padding: 1.25rem 1.75rem 1rem 1.75rem;
    font-size: 0.9rem;
    text-align: left;
    line-height: 1.25rem;
    letter-spacing: +0.25px;
    text-decoration: none;
    cursor: pointer;
    border: none;

    @media screen and (${devices.sm}) {
      width: 25rem;
    }

    span {
      display: block;
      font-weight: 700;
      font-size: 1rem;
    }
  }
`;

export const ContactForm: React.FunctionComponent = () => {
  const { state } = useQuestionnaireContext();

  const inputs = React.useMemo(() => {
    return Object.entries(state.contact).map(([field, value]) => {
      return { ...value, field };
    });
  }, [state.contact]);

  const onSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    console.log(event, state);
  };

  return (
    <StyledContactForm>
      <StyledStepTitle>Für wen sind die Angebote bestimmt?</StyledStepTitle>
      <form onSubmit={onSubmitHandler}>
        <div className="input-group">
          {inputs
            .filter(({ field }) => field !== 'postalCode')
            .map((input, key) => {
              switch (input.type) {
                case 'radio':
                  return (
                    <RadioInput
                      key={key}
                      field={input.field as keyof ContactData}
                      options={input.options}
                    />
                  );
                case 'text':
                case 'email':
                  return (
                    <TextInput
                      key={key}
                      type={input.type}
                      field={input.field as keyof ContactData}
                      label={input.label}
                      initialValue={input.value}
                    />
                  );
                case 'checkbox':
                  return (
                    <CheckboxInput
                      key={key}
                      field={input.field as keyof ContactData}
                      label={input.label}
                    />
                  );
              }
            })}
        </div>
        <button type="submit" className="call-to-action shining-button">
          <span>Jetzt Angebot erhalten</span>Kostenlos & Unverbindlich
        </button>
      </form>
      <QualityBadges />
    </StyledContactForm>
  );
};
