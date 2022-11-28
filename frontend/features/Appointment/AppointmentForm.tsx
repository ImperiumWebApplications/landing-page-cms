import { FormWrapper } from '../../components/Layout';
import { AppointmentProvider } from './context/Appointment';
import { ProgressPanel } from './components/ProgressPanel';
import { SelectionPanel } from './components/SelectionPanel';
import { LocationOption } from './hooks/useLocationOptions';
import { DateOptions } from './hooks/useDateOptions';

export type AppointmentFormStep = {
  label: string;
  heading: string;
  description?: string;
};
export type LocationFormStep = AppointmentFormStep & {
  type: 'location';
  options: LocationOption[];
};

export type DateFormStep = AppointmentFormStep & {
  type: 'dates';
  options: DateOptions;
};

export type DetailsFormStep = AppointmentFormStep & {
  type: 'details';
};

export type ConfirmationFormStep = AppointmentFormStep & {
  type: 'confirmation';
};

export type AppointmentStep =
  | LocationFormStep
  | DateFormStep
  | DetailsFormStep
  | ConfirmationFormStep;

type AppointmentFormProps = {
  steps: AppointmentStep[];
};

export const AppointmentForm: React.FC<AppointmentFormProps> = (props) => {
  return (
    <AppointmentProvider>
      <section className="md:h-full pt-8 pb-9 bg-[#FAFAFA]">
        <FormWrapper className="grid grid-cols-[1fr] md:grid-cols-[1fr_2fr] h-full md:py-14 px-8 md:px-16 md:bg-[white] md:rounded-[20px]">
          <ProgressPanel steps={props.steps} />
          <SelectionPanel steps={props.steps} />
        </FormWrapper>
      </section>
    </AppointmentProvider>
  );
};
