import { useMemo } from 'react';

import { NextAPI } from '../../../lib/next/api';
import {
  isTrackingAllowed,
  sendEventToAnalytics,
  TagManagerEvents,
} from '../../../lib/analytics';

import type { AppointmentStep } from '../AppointmentForm';

import { useAppointmentContext } from '../context/Appointment';
import { useAppointmentDuration } from '../hooks/useAppointmentDuration';
import { ContactDetailsForm } from '../../../components/Form';
import { Confirmation } from './Confirmation';
import { DateList } from './DateList';
import { LocationPicker } from './LocationPicker';

const DEFAULT_DESCRIPTION = 'In wenigen Schritten zum persönlichen Gespräch';

type SelectionPanelProps = {
  steps: AppointmentStep[];
};

export const SelectionPanel: React.FC<SelectionPanelProps> = ({ steps }) => {
  const { state, dispatch } = useAppointmentContext();
  const duration = useAppointmentDuration(steps);

  const content = steps[state.index];

  const FormStepComponent = useMemo(() => {
    switch (content.type) {
      case 'location':
        return (
          <LocationPicker
            options={content.options}
            value={state.location}
            onSubmit={() => {
              dispatch({
                type: 'setIndex',
                payload: state.index + 1,
              });
            }}
            setValue={(value) => {
              dispatch({ type: 'setLocation', payload: value });
            }}
          />
        );
      case 'dates':
        return (
          <DateList
            options={content.options}
            values={state.dates}
            onSubmit={() => {
              dispatch({
                type: 'setIndex',
                payload: state.index + 1,
              });
            }}
            setValues={(values) => {
              dispatch({ type: 'setDates', payload: values });
            }}
          />
        );
      case 'details':
        return (
          <ContactDetailsForm
            className="my-12"
            values={state.contact}
            onSubmit={async (onSuccess) => {
              const { location, dates } = state;
              const res = await NextAPI.createLead({
                domain: window.location.host,
                contact: state.contact,
                appointmentRequests: Object.values(dates ?? {}).map((date) => ({
                  date: date.toISOString(),
                  location,
                  duration,
                })),
              });

              if (!res.ok) throw Error(res.statusText);

              if (isTrackingAllowed(window.location.host))
                sendEventToAnalytics(TagManagerEvents.AppointmentRequested);

              onSuccess?.();
              dispatch({ type: 'setIndex', payload: state.index + 1 });
            }}
            setValues={(values) => {
              dispatch({ type: 'setDetails', payload: values });
            }}
          />
        );
      case 'confirmation':
        return (
          <Confirmation
            onSubmit={() => {
              dispatch({ type: 'setDates', payload: undefined });
              dispatch({ type: 'setDetails', payload: undefined });
              dispatch({ type: 'setLocation', payload: undefined });
              dispatch({ type: 'setIndex', payload: 0 });
            }}
          />
        );
      default:
        return <></>;
    }
  }, [content, dispatch, state, duration]);

  const MobileGoBackButton = useMemo(() => {
    const handleClick = () => {
      dispatch({ type: 'setIndex', payload: state.index - 1 });
    };

    return (
      <div className="mb-8 md:hidden">
        <button className="text-secondary underline" onClick={handleClick}>
          zurück
        </button>
      </div>
    );
  }, [state.index, dispatch]);

  return (
    <div className="text-center md:pl-10 md:text-left lg:pl-20">
      <h1 className="text-3xl font-semibold text-primary md:text-4xl">
        {content.heading}
      </h1>
      <p className="pt-2 pb-4 text-sm font-light text-gray">
        {content.description ?? DEFAULT_DESCRIPTION}
      </p>
      <div className="mx-auto h-[2px] w-[25px] bg-[black] opacity-50 md:mx-0" />
      {/* */}
      {FormStepComponent}
      {/* */}
      {state.index > 0 && content.type !== 'confirmation'
        ? MobileGoBackButton
        : undefined}
    </div>
  );
};
