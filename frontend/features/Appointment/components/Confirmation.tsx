import { Button } from './Button';

type ConfirmationProps = {
  onSubmit?: () => void;
};

export const Confirmation: React.FC<ConfirmationProps> = ({ onSubmit }) => {
  return (
    <div className="w-full h-auto md:h-[calc(100%-70px)] flex flex-col justify-between">
      <div className="w-full max-w-md mx-auto md:mx-0 text-center md:text-left">
        <h3 className="md:text-2xl text-primary font-semibold pt-10 pb-3">
          Die Bestätigungsmail ist auf dem Weg!
        </h3>
        <p className="md:text-lg font-normal">
          Wir haben Ihnen eine Bestätigungsmail an Ihre hinterlegte E-Mail
          Adresse gesendet. Dort finden Sie alle weiteren Informationen.
        </p>
      </div>
      <div className="w-full text-center md:text-right">
        <Button className="my-24 md:my-8 flex-shrink-0" onClick={onSubmit}>
          Zurück zur Startseite
        </Button>
      </div>
    </div>
  );
};
