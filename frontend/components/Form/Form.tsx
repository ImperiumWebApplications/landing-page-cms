import { FormEventHandler, useState } from 'react';

import { SpinnerIcon } from '../Icons';

type FormProps = {
  onSubmit: () => Promise<void>;
  children: React.ReactNode | React.ReactNode[];
};

export const Form = (props: FormProps) => {
  const [isFetchError, setIsFetchError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsFetchError(false);

    props
      .onSubmit()
      .catch(() => {
        setIsFetchError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-input-group">{props.children}</div>
      <div className="form-submit-group">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <SpinnerIcon className="h-10 w-10" />
          ) : (
            <>
              <span>Jetzt Angebot erhalten</span>Kostenlos & Unverbindlich
            </>
          )}
        </button>
        {isFetchError ? (
          <span className="error">
            Fehler beim Abschicken. Bitte versuchen Sie es erneut.
          </span>
        ) : undefined}
      </div>
    </form>
  );
};
