import { useState } from 'react';
import {
  ContactFieldLabelMap,
  ContactFields,
  ContactFieldValidations,
  Field,
} from '../../../components/Form';
import { AppointmentState } from '../context/Appointment';

import { Button } from './Button';

type ContactDetailsProps = {
  values: AppointmentState['contact'];
  setValues: (values: AppointmentState['contact']) => void;
  onSubmit?: (cb?: () => void) => Promise<void>;
};

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  values,
  onSubmit,
  setValues,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmissionFailed, setIsSubmissionFailed] = useState(false);

  return (
    <form
      className="w-full h-auto md:h-[calc(100%-75px)] flex flex-col justify-between"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="max-w-[380px] mx-auto md:mx-0 flex flex-col gap-6 my-8">
        <Field
          type="text"
          id={ContactFields.FirstName}
          label={ContactFieldLabelMap[ContactFields.FirstName]}
          validators={ContactFieldValidations[ContactFields.FirstName]}
          value={values?.firstName}
          onChange={(e) => {
            setValues({ ...values, firstName: e.target.value });
          }}
        />
        <Field
          type="text"
          id={ContactFields.LastName}
          label={ContactFieldLabelMap[ContactFields.LastName]}
          validators={ContactFieldValidations[ContactFields.LastName]}
          value={values?.lastName}
          onChange={(e) => {
            setValues({ ...values, lastName: e.target.value });
          }}
        />
        <Field
          type="text"
          id={ContactFields.Phone}
          label={ContactFieldLabelMap[ContactFields.Phone]}
          validators={ContactFieldValidations[ContactFields.Phone]}
          value={values?.phone}
          onChange={(e) => {
            setValues({ ...values, phone: e.target.value });
          }}
        />
        <Field
          type="email"
          id={ContactFields.Email}
          label={ContactFieldLabelMap[ContactFields.Email]}
          validators={ContactFieldValidations[ContactFields.Email]}
          value={values?.email}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />
      </div>
      <div className="w-full text-center md:text-right">
        {isSubmissionFailed ? (
          <span className="text-[red] opacity-70 text-sm tracking-tight px-4 block md:inline-block">
            Fehler beim Absenden
          </span>
        ) : undefined}
        <Button
          variant="button"
          type="submit"
          className="my-8 flex-shrink-0"
          isLoading={isSubmitting}
          disabled={isSubmitting || isInvalidDetailsForm(values)}
          onClick={async () => {
            setIsSubmitting(true);

            try {
              setIsSubmissionFailed(false);
              await onSubmit?.(() => {
                setIsSubmitting(false);
              });
            } catch {
              setIsSubmissionFailed(true);
              setIsSubmitting(false);
            }
          }}
        >
          Absenden
        </Button>
      </div>
    </form>
  );
};

const isInvalidDetailsForm = (contact: AppointmentState['contact']) => {
  if (!contact) return true;
  if (!contact.firstName) return true;
  if (!contact.lastName) return true;
  if (!contact.phone) return true;
  if (!contact.email) return true;
  return false;
};
