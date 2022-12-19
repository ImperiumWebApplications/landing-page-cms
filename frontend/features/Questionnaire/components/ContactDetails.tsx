import React from 'react';

import { NextAPI } from '../../../lib/next/api';
import {
  isTrackingAllowed,
  sendEventToAnalytics,
  TagManagerEvents,
} from '../../../lib/analytics';

import { useQuestionnaireContext } from '../context/Questionnaire';
import { ContactDetailsForm } from '../../../components/Form';
import { StyledStepTitle } from './StepTitle';
import { QualityBadges } from './QualityBadges';

export const ContactDetails: React.FunctionComponent = () => {
  const { state, dispatch } = useQuestionnaireContext();

  const handleSubmit = async (onSuccess?: () => void) => {
    const res = await NextAPI.createLead({
      domain: window.location.host,
      contact: state.contact,
      questionnaireResults: state.questionnaire.map(({ question, answer }) => ({
        question: question.value,
        answer: answer.value,
      })),
    });

    if (!res.ok) throw new Error(res.statusText);

    if (isTrackingAllowed(window.location.host))
      sendEventToAnalytics(TagManagerEvents.QuestionnaireSubmitted);

    onSuccess?.();
    dispatch({ type: 'setIndex', payload: { index: state.index + 1 } });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="absolute left-[calc(50%-4rem)] -top-2 flex w-32 animate-fadeDown items-center justify-center rounded-md bg-primary px-2 pt-1 pb-[2px] text-sm font-semibold text-[white] md:left-[calc(50%-4.5rem)] md:w-36">
        Letzter Schritt
      </div>
      <StyledStepTitle>Für wen sind die Angebote bestimmt?</StyledStepTitle>
      <ContactDetailsForm
        onSubmit={handleSubmit}
        values={state.contact}
        setValues={(values) => {
          dispatch({ type: 'setDetails', payload: { values } });
        }}
      />
      <QualityBadges />
    </div>
  );
};
