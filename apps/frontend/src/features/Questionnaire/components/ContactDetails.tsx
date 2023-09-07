import React from 'react';

import { motion } from 'framer-motion';

import type { LandingPage, StaticContent } from '../../../lib/strapi';
import { NextAPI } from '../../../lib/next/api/client';
import {
  isTrackingAllowed,
  sendEventToAnalytics,
  TagManagerEvents,
} from '../../../lib/analytics';

import { useQuestionnaireContext } from '../context/Questionnaire';
import { useLanguageContext } from '../../../context/Language';
import { ContactDetailsForm } from '../../../components/Form';
import { StepTitle } from './StepTitle';
import { QualityBadges } from './QualityBadges';

type ContactDetailsProps = {
  staticContent: StaticContent['questionnaire'];
};

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  staticContent,
}) => {
  const { language } = useLanguageContext();
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
    <div className="mx-auto max-w-xl">
      {staticContent?.contact_details_last_step_hint ? (
        <motion.div
          initial={{ opacity: 0, scaleY: 0.5, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0, scaleY: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute left-[calc(50%-4rem)] top-4 flex w-32 items-center justify-center rounded-full bg-primary px-2 py-[5px] text-sm leading-none text-[white] md:-top-[10px] md:left-[calc(50%-4.5rem)] md:w-36"
        >
          {staticContent?.contact_details_last_step_hint}
        </motion.div>
      ) : null}
      <div className="block h-10 md:hidden" />
      <StepTitle>{staticContent?.contact_details_step_title}</StepTitle>
      <ContactDetailsForm
        onSubmit={handleSubmit}
        values={state.contact}
        language={language}
        buttonText={staticContent?.contact_details_button_label}
        buttonCaption={staticContent?.contact_details_button_caption}
        setValues={(values) => {
          dispatch({ type: 'setDetails', payload: { values } });
        }}
      />
      <QualityBadges badges={staticContent?.contact_details_badges} />
    </div>
  );
};
