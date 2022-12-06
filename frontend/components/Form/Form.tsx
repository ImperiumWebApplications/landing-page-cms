import { FormEventHandler, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
            <LoadingSpinner />
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

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.3rem solid rgba(255, 255, 255, 0.2);
  border-right: 0.3rem solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.3rem solid rgba(255, 255, 255, 0.2);
  border-left: 0.3rem solid #ffffff;
  transform: translateZ(0);
  animation: ${rotate360} 1.1s infinite linear;

  &::after {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
  }
`;
