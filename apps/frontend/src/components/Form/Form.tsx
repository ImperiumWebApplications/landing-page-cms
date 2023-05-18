import { FormEventHandler, ReactNode, useState } from 'react';

import { i18n } from '../../config/i18n.config';
import { useLanguageContext } from '../../context/Language';

import { SpinnerIcon } from '../Icons';

type FormProps = {
  onSubmit: () => Promise<void>;
  children: React.ReactNode | React.ReactNode[];
  buttonText: ReactNode;
};

export const Form = (props: FormProps) => {
  const { language } = useLanguageContext();

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
            <>{props.buttonText}</>
          )}
        </button>
        {isFetchError ? (
          <span className="error">{i18n[language].FORM_SUBMIT_ERROR}</span>
        ) : undefined}
      </div>
    </form>
  );
};
