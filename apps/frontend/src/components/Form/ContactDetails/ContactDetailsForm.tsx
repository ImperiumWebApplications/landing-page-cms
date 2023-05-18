import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import * as Sentry from '@sentry/nextjs';

import type { LandingPageLanguage } from '../../../lib/strapi';
import { i18n } from '../../../config/i18n.config';

import { ContactFieldConfig } from './ContactDetailsForm.config';
import { isValidContactDetailsData } from './ContactDetailsForm.validator';

import { Button } from '../../Button';
import { Field } from '../Field';

export type ContactDetailsFormValues = {
  [ContactFieldConfig.Salutation.id]?: string | undefined;
  [ContactFieldConfig.FirstName.id]?: string | undefined;
  [ContactFieldConfig.LastName.id]?: string | undefined;
  [ContactFieldConfig.Email.id]?: string | undefined;
  [ContactFieldConfig.Phone.id]?: string | undefined;
  [ContactFieldConfig.TermsAccepted.id]?: boolean | undefined;
};

export type ContactDetailsFormProps = {
  values?: ContactDetailsFormValues;
  setValues: (values: ContactDetailsFormValues) => void;
  onSubmit?: (cb?: () => void) => Promise<void>;
  className?: string;
  buttonText?: string | null;
  buttonCaption?: string | null;
  language: LandingPageLanguage;
};

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  values,
  onSubmit,
  setValues,
  className,
  buttonCaption,
  buttonText,
  language,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionFailed, setIsSubmissionFailed] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);

  const SalutationField = ContactFieldConfig.Salutation.getConfig(language);
  const FirstNameField = ContactFieldConfig.FirstName.getConfig(language);
  const LastNameField = ContactFieldConfig.LastName.getConfig(language);
  const EmailField = ContactFieldConfig.Email.getConfig(language);
  const PhoneField = ContactFieldConfig.Phone.getConfig(language);
  const TermsAcceptedField =
    ContactFieldConfig.TermsAccepted.getConfig(language);

  const handleSubmit = useCallback(async () => {
    if (!isValidContactDetailsData(values)) {
      setIsInvalidInput(true);
      return;
    }

    setIsInvalidInput(false);
    setIsSubmissionFailed(false);
    setIsSubmitting(true);

    try {
      await onSubmit?.(() => {
        setIsSubmitting(false);
      });
    } catch (err) {
      setIsSubmissionFailed(true);
      setIsSubmitting(false);
      Sentry.captureException(err);
    }
  }, [onSubmit, values]);

  useEffect(() => {
    setIsInvalidInput(false);
  }, [values]);

  return (
    <form
      className={cx('flex h-auto w-full flex-col justify-start', className)}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid grid-flow-row grid-cols-1 gap-6 md:grid-flow-row md:grid-cols-2">
        <Field
          type="radio"
          className="md:col-span-2"
          id={ContactFieldConfig.Salutation.id}
          options={SalutationField.label}
          value={values?.salutation}
          error={isInvalidInput && !values?.salutation}
          onChange={(v) => {
            setValues({ ...values, salutation: v });
          }}
        />
        <Field
          type="text"
          id={ContactFieldConfig.FirstName.id}
          label={FirstNameField.label}
          validators={FirstNameField.validators}
          error={isInvalidInput && !values?.firstName}
          value={values?.firstName}
          onChange={(e) => {
            setValues({ ...values, firstName: e.target.value });
          }}
        />
        <Field
          type="text"
          id={ContactFieldConfig.LastName.id}
          label={LastNameField.label}
          validators={LastNameField.validators}
          error={isInvalidInput && !values?.lastName}
          value={values?.lastName}
          onChange={(e) => {
            setValues({ ...values, lastName: e.target.value });
          }}
        />
        <Field
          type="text"
          id={ContactFieldConfig.Phone.id}
          label={PhoneField.label}
          validators={PhoneField.validators}
          error={isInvalidInput && !values?.phone}
          value={values?.phone}
          onChange={(e) => {
            setValues({ ...values, phone: e.target.value });
          }}
        />
        <Field
          type="email"
          id={ContactFieldConfig.Email.id}
          label={EmailField.label}
          validators={EmailField.validators}
          error={isInvalidInput && !values?.email}
          value={values?.email}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <Field
          type="checkbox"
          className="md:col-span-2 md:!max-w-full"
          id={ContactFieldConfig.TermsAccepted.id}
          value={values?.acceptedTerms}
          label={TermsAcceptedField.label}
          error={isInvalidInput && !values?.acceptedTerms}
          onChange={() => {
            setValues({ ...values, acceptedTerms: !values?.acceptedTerms });
          }}
        />
      </div>
      <div className="relative my-4 flex w-full justify-center md:my-6">
        {isSubmissionFailed || isInvalidInput ? (
          <span className="absolute -top-2 left-0 block w-full px-4 text-center text-sm tracking-tight text-[indianred]">
            {getErrorMessage(language, { isSubmissionFailed, isInvalidInput })}
          </span>
        ) : undefined}
        <Button
          variant="primary"
          label={buttonText ?? i18n[language].FORM_SUBMIT_CTA}
          data-testid="contact-details-form-submit"
          className="my-4 px-6 text-base sm:px-10 md:px-20"
          loading={isSubmitting}
          disabled={isSubmitting}
          onClick={handleSubmit}
        />
        <span className="absolute -bottom-3 left-0 w-full text-center text-xs sm:text-[0.8rem]">
          {buttonCaption}
        </span>
      </div>
    </form>
  );
};

const getErrorMessage = (
  language: LandingPageLanguage,
  { isSubmissionFailed, isInvalidInput }: Record<string, boolean>,
) => {
  if (isInvalidInput) {
    return i18n[language].FORM_INVALID_FIELDS;
  }
  if (isSubmissionFailed) {
    return i18n[language].FORM_SUBMIT_ERROR;
  }
  return '';
};
