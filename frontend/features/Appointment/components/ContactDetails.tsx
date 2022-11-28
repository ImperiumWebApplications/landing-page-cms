import { useState } from 'react';
import { AppointmentState } from '../context/Appointment';

import { Button } from './Button';
import { TextInput } from './TextInput';

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
        <TextInput
          id="name"
          label="Name"
          placeholder="Nachname"
          value={values?.lastName}
          onChange={(e) => {
            setValues({ ...values, lastName: e.target.value });
          }}
        />
        <TextInput
          id="firstName"
          label="Vorname"
          placeholder="Vorname"
          value={values?.firstName}
          onChange={(e) => {
            setValues({ ...values, firstName: e.target.value });
          }}
        />
        <TextInput
          id="phone"
          label="Telefonnr."
          placeholder="Telefonnr."
          value={values?.phone}
          onChange={(e) => {
            setValues({ ...values, phone: e.target.value });
          }}
        />
        <TextInput
          id="email"
          label="E-Mail Adresse"
          placeholder="E-Mail Adresse"
          type="email"
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
