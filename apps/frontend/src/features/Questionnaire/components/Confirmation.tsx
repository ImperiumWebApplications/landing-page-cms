import React from 'react';

import { StepTitle } from './StepTitle';
import { CheckCircleIcon } from '../../../components/Icons';
import { Button } from '../../../components/Button';

export const Confirmation: React.FC<{ phone?: string | null }> = ({
  phone,
}) => {
  return (
    <div
      data-testid="questionnaire-confirmation"
      className="mx-auto w-full max-w-xl"
    >
      <div className="mx-auto -mt-4 mb-8 h-20 w-20">
        <CheckCircleIcon className="h-20 w-20 fill-primary opacity-50" />
      </div>
      <div className="mb-12 text-center">
        <StepTitle>Ihre Anfrage wurde erfolgreich übermittelt.</StepTitle>
        <p className="-mt-4">
          Zeitnah erhalten Sie von uns einen Anruf, damit wir Ihre Angaben
          gemeinsam validieren können. Kurz darauf werden Sie mindestens ein
          Angebot, von einem unserer Premium Partner erhalten. So ist eine
          professionelle Unterstützung, für Sie persönlich garantiert.
        </p>
        {phone && (
          <div className="my-8 mx-auto max-w-md border-t border-b border-dashed border-[black]/10 py-6">
            <h3 className="mx-0 mb-4 text-xl">
              Verifizierungsvorgang beschleunigen
            </h3>
            <p className="text-sm">
              Kostenfrei anrufen:{' '}
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
        <p className="mx-auto max-w-md">
          Es werden Ihnen dabei keine anderen Kosten entstehen, als die durch
          die Nutzung Ihres Internetzugangs.
        </p>
        <Button
          to="/"
          variant="tertiary"
          className="mt-12 font-normal"
          label="Zurück zur Startseite"
        />
      </div>
    </div>
  );
};
