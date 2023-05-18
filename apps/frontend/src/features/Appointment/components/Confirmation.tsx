import { Button } from '../../../components/Button';

type ConfirmationProps = {
  onSubmit?: () => void;
};

export const Confirmation: React.FC<ConfirmationProps> = ({ onSubmit }) => {
  return (
    <div className="flex h-auto w-full flex-col justify-between md:h-[calc(100%-70px)]">
      <div className="mx-auto w-full max-w-md text-center md:mx-0 md:text-left">
        <h3 className="pt-10 pb-3 font-semibold text-primary md:text-2xl">
          Die Bestätigungsmail ist auf dem Weg!
        </h3>
        <p className="font-normal md:text-lg">
          Wir haben Ihnen eine Bestätigungsmail an Ihre hinterlegte E-Mail
          Adresse gesendet. Dort finden Sie alle weiteren Informationen.
        </p>
      </div>
      <div className="w-full text-center md:text-right">
        <Button
          variant="tertiary"
          className="my-24 flex-shrink-0 md:my-8"
          onClick={onSubmit}
          label="Zurück zur Startseite"
        />
      </div>
    </div>
  );
};
