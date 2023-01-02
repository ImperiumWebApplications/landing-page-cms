import React from 'react';

import { StepTitle } from './StepTitle';
import { CheckCircleIcon } from '../../../components/Icons';

export const Confirmation: React.FC<{ phone?: string | null }> = ({
  phone,
}) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mx-auto -mt-4 mb-8 h-20 w-20">
        <CheckCircleIcon className="h-20 w-20 fill-primary opacity-50" />
      </div>
      <div>
        <StepTitle>Ihre Anfrage wurde erfolgreich übermittelt.</StepTitle>
        <p>
          Zeitnah erhalten Sie von uns einen Anruf, damit wir Ihre Angaben
          gemeinsam validieren können. Kurz darauf werden Sie mindestens ein
          Angebot, von einem unserer Premium Partner erhalten. So ist eine
          professionelle Unterstützung, für Sie persönlich garantiert.
        </p>
        {phone && (
          <>
            <h2 className="mx-0 mt-6 mb-2 text-xl">
              Verifizierungsvorgang beschleunigen:
            </h2>
            <p className="mb-6 text-lg">
              Kostenfrei anrufen:{' '}
              <span className="block font-semibold">{phone}</span>
            </p>
          </>
        )}
        <p>
          Es werden Ihnen dabei keine anderen Kosten entstehen, als die durch
          die Nutzung Ihres Internetzugangs.
        </p>
      </div>
    </div>
  );
};
