import { useCallback, useState } from 'react';
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

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      setIsSubmissionFailed(false);
      await onSubmit?.(() => {
        setIsSubmitting(false);
      });
    } catch (err) {
      setIsSubmissionFailed(true);
      setIsSubmitting(false);
      Sentry.captureException(err);
    }
  }, [onSubmit]);

  return (
    <form
      className={cx('flex h-auto w-full flex-col justify-start', className)}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid grid-flow-row grid-cols-1 gap-8 md:grid-flow-row md:grid-cols-2">
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
          className="md:col-span-2 md:max-w-full"
          id={ContactFieldConfig.TermsAccepted.name}
          value={values?.acceptedTerms}
          label={ContactFieldConfig.TermsAccepted.label}
          onChange={() => {
            setValues({ ...values, acceptedTerms: !values?.acceptedTerms });
          }}
        />
      </div>
      <div className="relative my-12 flex w-full justify-center">
        {isSubmissionFailed ? (
          <span className="absolute top-0 left-0 block w-full px-4 text-center text-sm font-semibold tracking-tight text-[red] opacity-60">
            Fehler beim Absenden. Bitte versuchen Sie es erneut.
          </span>
        ) : undefined}
        <Button
          variant="primary"
          size="large"
          label="Jetzt Anfrage abschicken"
          description="Kostenlos & Unverbindlich"
          className="my-8 flex-shrink-0 px-20 text-lg"
          loading={isSubmitting}
          disabled={isSubmitting || !isValidContactDetailsData(values)}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};
