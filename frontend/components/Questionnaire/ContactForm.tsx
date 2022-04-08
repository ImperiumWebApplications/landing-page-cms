import React from 'react';
import styled from 'styled-components';
import { BadgeCheck } from '@styled-icons/heroicons-outline';
import * as Sentry from '@sentry/nextjs';

import type {
  CheckboxFields,
  ContactData,
  EmailFields,
  FormField,
  RadioFields,
  TextFields,
} from '../../context/Questionnaire/state';
import type { TrackingIds } from '../../backend-api';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { StyledStepTitle } from './StepTitle';
import { TextInput } from './TextInput';
import { RadioInput } from './RadioInput';
import { CheckboxInput } from './CheckboxInput';
import { LoadingSpinner } from './LoadingSpinner';
import { QualityBadges } from './QualityBadges';
import { sendConversionToGoogle } from '../TrackingScripts';
import { NextAPI } from '../../lib/api/request';
import { devices } from '../../config/breakpoints.config';
import {
  formFieldValidations,
  hiddenFieldsOnContactForm,
} from '../../config/form.config';
import { getAnimation } from '../../config/animations.config';
import { goToStep } from '../../utils/goToStep';
import { isFormDataComplete } from '../../utils/isFormDataComplete';

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

export const ContactForm: React.FunctionComponent<{
  tracking?: TrackingIds;
}> = ({ tracking }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { state, dispatch } = useQuestionnaireContext();

  const inputs = React.useMemo(() => {
    return Object.entries(state.contact).map(([field, value]) => {
      return { ...value, field } as FormField & { field: keyof ContactData };
    });
  }, [state.contact]);

  const onSubmitHandler: React.FormEventHandler = async (event) => {
    event.preventDefault();
    setError(undefined);

    if (!isFormDataComplete(state)) {
      setError('Bitte füllen Sie das komplette Formular aus.');
      return;
    }

    try {
      setLoading(true);

      if (!process.env.NEXT_PUBLIC_API_ROUTE)
        throw new Error('Missing credentials for API route');

      const res = await NextAPI.createLeadInPipedrive({
        host: location.host,
        questionnaire: state.questionnaire,
        contact: state.contact,
      });

      if (!res.ok) throw new Error(res.statusText);

      if (tracking)
        sendConversionToGoogle(
          location.host,
          tracking.google_ads_id,
          tracking.google_ads_conversion_id,
        );

      setLoading(false);
      goToStep(dispatch, state.currentIndex + 1);
      window.onbeforeunload = () => null;
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
          {inputs
            .filter(({ field }) => !hiddenFieldsOnContactForm.includes(field))
            .map((input, key) => {
              switch (input.type) {
                case 'radio':
                  return (
                    <RadioInput
                      key={key}
                      field={input.field as keyof RadioFields}
                      options={input.options}
                    />
                  );
                case 'text':
                case 'email':
                  return (
                    <TextInput
                      key={key}
                      type={input.type}
                      field={
                        input.field as keyof TextFields | keyof EmailFields
                      }
                      label={input.label}
                      validations={
                        formFieldValidations[input.field as keyof ContactData]
                      }
                    />
                  );
                case 'checkbox':
                  return (
                    <CheckboxInput
                      key={key}
                      field={input.field as keyof CheckboxFields}
                      label={input.label}
                    />
                  );
              }
            })}
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
