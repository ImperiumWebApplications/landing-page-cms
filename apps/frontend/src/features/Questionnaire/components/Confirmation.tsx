import React from 'react';

import ReactMarkdown from 'react-markdown';

import type { StaticContent } from '../../../lib/strapi';
import { i18n } from '../../../config/i18n.config';
import { useLanguageContext } from '../../../context/Language';
import { useQueryParam } from '../../../hooks/useQueryParam';

import { CheckCircleIcon } from '../../../components/Icons';
import { Button } from '../../../components/Button';
import { StepTitle } from './StepTitle';

type ConfirmationProps = {
  phone?: string | null;
  staticContent?: StaticContent['questionnaire'];
};

export const Confirmation: React.FC<ConfirmationProps> = ({
  phone,
  staticContent,
}) => {
  const { language } = useLanguageContext();

  useQueryParam(i18n[language].FORM_CONFIRMATION_TRACKING_PARAM, '1');

  return (
    <div
      data-testid="questionnaire-confirmation"
      className="mx-auto w-full max-w-xl"
    >
      <div className="mx-auto -mt-4 mb-8 h-20 w-20">
        <CheckCircleIcon className="h-20 w-20 fill-primary opacity-50" />
      </div>
      <div className="mb-12 text-center">
        <StepTitle>{staticContent?.confirmation_step_title}</StepTitle>
        {staticContent?.confirmation_paragraph_top && (
          <ReactMarkdown className="-mt-4">
            {staticContent?.confirmation_paragraph_top}
          </ReactMarkdown>
        )}
        {phone && (
          <div className="my-8 mx-auto max-w-md border-t border-b border-dashed border-[black]/10 py-6">
            <h3 className="mx-0 mb-4 text-xl">
              {staticContent?.confirmation_call_to_action_title}
            </h3>
            <p className="text-sm">
              {staticContent?.confirmation_call_to_action_prefix}{' '}
              <a
                data-testid="questionnaire-confirmation-phone"
                href={`tel:${phone}`}
                className="block text-xl tracking-wider"
              >
                {phone}
              </a>
            </p>
          </div>
        )}
        {staticContent?.confirmation_paragraph_bottom && (
          <ReactMarkdown className="mx-auto max-w-md">
            {staticContent?.confirmation_paragraph_bottom}
          </ReactMarkdown>
        )}
        <Button
          to="/"
          variant="tertiary"
          className="mt-12 font-normal"
          label={
            staticContent?.confirmation_home_button_label ??
            i18n[language].BACK_HOME
          }
        />
      </div>
    </div>
  );
};
