import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CheckmarkCircle } from '@styled-icons/fluentui-system-regular';

const StyledConfirmation = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  .icon {
    margin: 0 auto;
    width: 7.5rem;
    height: 7.5rem;
  }

  .title {
    margin: 2rem 0;
  }

  .subtitle {
    margin: 1.5rem 0 0.5rem 0;
    font-size: 1.25rem;

    & + p {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const Confirmation: React.FunctionComponent<{ phone?: string }> = ({
  phone,
}) => {
  const theme = useTheme();

  return (
    <StyledConfirmation>
      <div className="icon">
        <CheckmarkCircle
          width={120}
          height={120}
          color={theme.colors.primary}
          opacity={0.5}
        />
      </div>
      <div className="content">
        <h1 className="title">Ihre Anfrage wurde erfolgreich übermittelt.</h1>
        <p>
          Zeitnah erhalten Sie von uns einen Anruf, damit wir Ihre Angaben
          gemeinsam validieren können. Kurz darauf werden Sie mindestens ein
          Angebot, von einem unserer Premium Partner erhalten. So ist eine
          professionelle Unterstützung, für Sie persönlich garantiert.
        </p>
        {phone && (
          <>
            <h2 className="subtitle">Verifizierungsvorgang beschleunigen:</h2>
            <p>Kostenfrei anrufen: {phone}</p>
          </>
        )}
        <p>
          Es werden Ihnen dabei keine anderen Kosten entstehen, als die durch
          die Nutzung Ihres Internetzugangs.
        </p>
      </div>
    </StyledConfirmation>
  );
};
