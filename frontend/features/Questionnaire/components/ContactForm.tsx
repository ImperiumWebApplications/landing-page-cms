import React, { useState } from 'react';
import styled from 'styled-components';
import { BadgeCheck } from '@styled-icons/heroicons-outline';
import * as Sentry from '@sentry/nextjs';

import { getAnimation } from '../../../config/animations.config';
import { devices } from '../../../config/breakpoints.config';
import {
  QuestionnaireState,
  useQuestionnaireContext,
} from '../context/Questionnaire';
import {
  isTrackingAllowed,
  sendEventToAnalytics,
  TagManagerEvents,
} from '../../../lib/analytics';
import { StyledStepTitle } from './StepTitle';
import { QualityBadges } from './QualityBadges';
import { LoadingSpinner } from './LoadingSpinner';
import { RadioInput } from './RadioInput';
import { TextInput } from './TextInput';
import {
  ContactFieldLabelMap,
  ContactFields,
  ContactFieldValidations,
} from '../../../config/form.config';
import { CheckboxInput } from './CheckboxInput';
import { NextAPI } from '../../../lib/next/api';

const StyledContactForm = styled.div`
  max-width: 45rem;
  margin: 0 auto;

  .toast {
    position: absolute;
    left: calc(50% - 4rem);
    top: -0.25rem;
    width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.125rem 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: white;
    font-size: 0.8rem;

    animation-name: ${getAnimation('fadeDown')};
    animation-delay: 500ms;
    animation-duration: 100ms;
    animation-fill-mode: backwards;

    @media screen and (${devices.md}) {
      left: calc(50% - 4.5rem);
      width: 9rem;
      font-size: 0.9rem;
    }
  }

  form .input-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    column-gap: 1rem;
    row-gap: 1rem;

    @media screen and (${devices.md}) {
      column-gap: 2rem;
      row-gap: 2rem;
    }
  }

  button {
    display: block;
    width: 100%;
    height: auto;
    min-height: 4.75rem;
    margin: 2rem auto;
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
      margin: 4rem auto;
      width: 25rem;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.8;
    }

    span {
      display: block;
      font-weight: 700;
      font-size: 1rem;
    }
  }

  span.error {
    display: block;
    margin: -1rem 0 3rem 0;
    text-align: center;
    font-size: 0.9rem;
    color: red;
    opacity: 0.75;
  }
`;

export const ContactForm: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { state, dispatch } = useQuestionnaireContext();

  const onSubmitHandler: React.FormEventHandler = async (event) => {
    event.preventDefault();
    setError(undefined);

    try {
      setLoading(true);

      if (!process.env.NEXT_PUBLIC_API_ROUTE)
        throw new Error('Missing credentials for API route');

      const res = await NextAPI.createLead({
        domain: location.host,
        questionnaireResults: state.questionnaire,
        contact: state.contact,
      });

      if (!res.ok) throw new Error(res.statusText);

      if (isTrackingAllowed(location.host))
        sendEventToAnalytics(TagManagerEvents.QuestionnaireSubmitted);

      setLoading(false);
      dispatch({ type: 'setIndex', payload: { index: state.index + 1 } });
    } catch (err) {
      setLoading(false);
      setError('Fehler beim Abschicken. Bitte versuchen Sie es erneut.');
      Sentry.captureException(err);
    }
  };

  return (
    <StyledContactForm>
      <div className="toast">
        <BadgeCheck width={18} /> Letzter Schritt
      </div>
      <StyledStepTitle>Für wen sind die Angebote bestimmt?</StyledStepTitle>
      <form onSubmit={onSubmitHandler}>
        <div className="input-group">
          <RadioInput
            field={ContactFields.Salutation}
            options={['Herr', 'Frau']}
          />
          <TextInput
            type="text"
            field={ContactFields.FirstName}
            label={ContactFieldLabelMap[ContactFields.FirstName]}
            validations={ContactFieldValidations[ContactFields.FirstName]}
          />
          <TextInput
            type="text"
            field={ContactFields.LastName}
            label={ContactFieldLabelMap[ContactFields.LastName]}
            validations={ContactFieldValidations[ContactFields.LastName]}
          />
          <TextInput
            type="email"
            field={ContactFields.Email}
            label={ContactFieldLabelMap[ContactFields.Email]}
            validations={ContactFieldValidations[ContactFields.Email]}
          />
          <TextInput
            type="text"
            field={ContactFields.Phone}
            label={ContactFieldLabelMap[ContactFields.Phone]}
            validations={ContactFieldValidations[ContactFields.Phone]}
          />
          <CheckboxInput
            field={ContactFields.TermsAccepted}
            label={ContactFieldLabelMap[ContactFields.TermsAccepted]}
          />
        </div>
        <button
          type="submit"
          className={`call-to-action ${
            !loading && isFormDataComplete(state) ? 'shining-button' : ''
          }`}
          disabled={loading || !isFormDataComplete(state)}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <span>Jetzt Angebot erhalten</span>Kostenlos & Unverbindlich
            </>
          )}
        </button>
        {error && <span className="error">{error}</span>}
      </form>
      <QualityBadges />
    </StyledContactForm>
  );
};

const isFormDataComplete = (state: QuestionnaireState) => {
  const fields = Object.entries(state.contact).filter(
    ([key]) => key !== ContactFields.PostalCode && key !== ContactFields.City,
  );
  if (!fields.length) return false;
  return !fields.some(([_, field]) => {
    if (typeof field === 'boolean') return field === false;
    return !/(.|\s)*\S(.|\s)*/.test(field);
  });
};
