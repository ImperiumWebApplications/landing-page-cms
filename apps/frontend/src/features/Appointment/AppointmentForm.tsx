import { FormWrapper } from '../../components/Layout';
import { AppointmentProvider } from './context/Appointment';
import { ProgressPanel } from './components/ProgressPanel';
import { SelectionPanel } from './components/SelectionPanel';
import { LocationOption } from './hooks/useLocationOptions';

export type AppointmentFormStep = {
  label: string;
  heading: string;
  description?: string;
};
export type LocationFormStep = AppointmentFormStep & {
  type: 'location';
  options: LocationOption[];
};

export type DetailsFormStep = AppointmentFormStep & {
  type: 'details';
};

export type ConfirmationFormStep = AppointmentFormStep & {
  type: 'confirmation';
};

export type AppointmentStep =
  | LocationFormStep
  | DetailsFormStep
  | ConfirmationFormStep;

type AppointmentFormProps = {
  steps: AppointmentStep[];
};

export const AppointmentForm: React.FC<AppointmentFormProps> = (props) => {
  return (
    <AppointmentProvider>
      <section className="bg-[#FAFAFA] pt-8 pb-9 md:h-full">
        <FormWrapper className="grid h-full grid-cols-[1fr] px-8 md:grid-cols-[1fr_2fr] md:rounded-[20px] md:bg-[white] md:py-14 md:px-16 md:shadow-lg">
          <ProgressPanel steps={props.steps} />
          <SelectionPanel steps={props.steps} />
        </FormWrapper>
      </section>
    </AppointmentProvider>
  );
};
