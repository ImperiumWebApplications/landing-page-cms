import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import * as Sentry from '@sentry/nextjs';

import { ContactFieldConfig } from './ContactDetailsForm.config';
import { isValidContactDetailsData } from './ContactDetailsForm.validator';

import { Button } from '../../Button';
import { Field } from '../Field';

export type ContactDetailsFormValues = {
  [ContactFieldConfig.Salutation.name]?: string | undefined;
  [ContactFieldConfig.FirstName.name]?: string | undefined;
  [ContactFieldConfig.LastName.name]?: string | undefined;
  [ContactFieldConfig.Email.name]?: string | undefined;
  [ContactFieldConfig.Phone.name]?: string | undefined;
  [ContactFieldConfig.TermsAccepted.name]?: boolean | undefined;
};

export type ContactDetailsFormProps = {
  values?: ContactDetailsFormValues;
  setValues: (values: ContactDetailsFormValues) => void;
  onSubmit?: (cb?: () => void) => Promise<void>;
  className?: string;
};

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  values,
  onSubmit,
  setValues,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionFailed, setIsSubmissionFailed] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);

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
          id={ContactFieldConfig.Salutation.name}
          options={ContactFieldConfig.Salutation.label}
          value={values?.salutation}
          onChange={(v) => {
            setValues({ ...values, salutation: v });
          }}
        />
        <Field
          type="text"
          id={ContactFieldConfig.FirstName.name}
          label={ContactFieldConfig.FirstName.label}
          validators={ContactFieldConfig.FirstName.validators}
          value={values?.firstName}
          onChange={(e) => {
            setValues({ ...values, firstName: e.target.value });
          }}
        />
        <Field
          type="text"
          id={ContactFieldConfig.LastName.name}
          label={ContactFieldConfig.LastName.label}
          validators={ContactFieldConfig.LastName.validators}
          value={values?.lastName}
          onChange={(e) => {
            setValues({ ...values, lastName: e.target.value });
          }}
        />
        <Field
          type="text"
          id={ContactFieldConfig.Phone.name}
          label={ContactFieldConfig.Phone.label}
          validators={ContactFieldConfig.Phone.validators}
          value={values?.phone}
          onChange={(e) => {
            setValues({ ...values, phone: e.target.value });
          }}
        />
        <Field
          type="email"
          id={ContactFieldConfig.Email.name}
          label={ContactFieldConfig.Email.label}
          validators={ContactFieldConfig.Email.validators}
          value={values?.email}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
        <Field
          type="checkbox"
          className="md:col-span-2 md:!max-w-full"
          id={ContactFieldConfig.TermsAccepted.name}
          value={values?.acceptedTerms}
          label={ContactFieldConfig.TermsAccepted.label}
          onChange={() => {
            setValues({ ...values, acceptedTerms: !values?.acceptedTerms });
          }}
        />
      </div>
      <div className="relative my-4 flex w-full justify-center md:my-6">
        {isSubmissionFailed || isInvalidInput ? (
          <span className="absolute -top-2 left-0 block w-full px-4 text-center text-sm tracking-tight text-[indianred]">
            {getErrorMessage({ isSubmissionFailed, isInvalidInput })}
          </span>
        ) : undefined}
        <Button
          variant="primary"
          label="Jetzt Anfrage abschicken"
          data-testid="contact-details-form-submit"
          className="my-4 px-6 text-base sm:px-10 md:px-20"
          loading={isSubmitting}
          disabled={isSubmitting}
          onClick={handleSubmit}
        />
        <span className="absolute -bottom-3 left-0 w-full text-center text-xs sm:text-[0.8rem]">
          Ihre Anfrage ist kostenlos und unverbindlich.
        </span>
      </div>
    </form>
  );
};

const getErrorMessage = ({
  isSubmissionFailed,
  isInvalidInput,
}: Record<string, boolean>) => {
  if (isInvalidInput) {
    return 'Bitte füllen Sie alle Felder korrekt aus.';
  }
  if (isSubmissionFailed) {
    return 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
  }
  return '';
};
