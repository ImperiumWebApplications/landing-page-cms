import React, { useState } from 'react';
import styled from 'styled-components';
import { BadgeCheck } from '@styled-icons/heroicons-outline';
import * as Sentry from '@sentry/nextjs';

import { getAnimation } from '../../../components/Animation/Animation.config';
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
import {
  ContactFieldLabelMap,
  ContactFields,
  ContactFieldValidations,
} from '../../../components/Form/Form.config';
import { NextAPI } from '../../../lib/next/api';
import { Field } from '../../../components/Form';
import { Button } from '../../../components/Button';

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

  const onSubmitHandler = async () => {
    setError(undefined);

    try {
      setLoading(true);

      if (!process.env.NEXT_PUBLIC_API_ROUTE)
        throw new Error('Missing credentials for API route');

      const res = await NextAPI.createLead({
        domain: location.host,
        contact: state.contact,
        questionnaireResults: state.questionnaire.map(
          ({ question, answer }) => ({
            question: question.value,
            answer: answer.value,
          }),
        ),
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

  const updateContext = (
    field: keyof QuestionnaireState['contact'],
    value: string | boolean,
  ) => {
    dispatch({ type: 'setDetails', payload: { field, value } });
  };

  return (
    <StyledContactForm>
      <div className="toast">
        <BadgeCheck width={18} /> Letzter Schritt
      </div>
      <StyledStepTitle>Für wen sind die Angebote bestimmt?</StyledStepTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="input-group">
          <Field
            type="radio"
            className="col-span-2"
            id={ContactFields.Salutation}
            value={state.contact.salutation}
            onChange={(value) => updateContext(ContactFields.Salutation, value)}
            options={ContactFieldLabelMap[ContactFields.Salutation]}
          />
          <Field
            type="text"
            id={ContactFields.FirstName}
            value={state.contact.firstName}
            label={ContactFieldLabelMap[ContactFields.FirstName]}
            validators={ContactFieldValidations[ContactFields.FirstName]}
            onChange={(e) =>
              updateContext(ContactFields.FirstName, e.target.value)
            }
          />
          <Field
            type="text"
            id={ContactFields.LastName}
            value={state.contact.lastName}
            label={ContactFieldLabelMap[ContactFields.LastName]}
            validators={ContactFieldValidations[ContactFields.LastName]}
            onChange={(e) =>
              updateContext(ContactFields.LastName, e.target.value)
            }
          />
          <Field
            type="email"
            id={ContactFields.Email}
            value={state.contact.email}
            label={ContactFieldLabelMap[ContactFields.Email]}
            validators={ContactFieldValidations[ContactFields.Email]}
            onChange={(e) => updateContext(ContactFields.Email, e.target.value)}
          />
          <Field
            type="text"
            id={ContactFields.Phone}
            value={state.contact.phone}
            label={ContactFieldLabelMap[ContactFields.Phone]}
            validators={ContactFieldValidations[ContactFields.Phone]}
            onChange={(e) => updateContext(ContactFields.Phone, e.target.value)}
          />
          <Field
            type="checkbox"
            className="col-span-2 max-w-full"
            id={ContactFields.TermsAccepted}
            value={state.contact.acceptedTerms}
            label={ContactFieldLabelMap[ContactFields.TermsAccepted]}
            validators={ContactFieldValidations[ContactFields.TermsAccepted]}
            onChange={() =>
              updateContext(
                ContactFields.TermsAccepted,
                !state.contact.acceptedTerms,
              )
            }
          />
        </div>
        <Button
          variant="primary"
          size="large"
          className="mt-16 mb-20 w-full md:mx-[25%] md:w-[50%]"
          label="Jetzt Angebot erhalten"
          description="Kostenlos & Unverbindlich"
          disabled={loading || !isFormDataComplete(state)}
          onClick={onSubmitHandler}
        />
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
