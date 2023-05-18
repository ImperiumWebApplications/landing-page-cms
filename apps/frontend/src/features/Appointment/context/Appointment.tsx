import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import type { ContactDetailsFormValues } from '../../../components/Form';
import { setBrowserHistoryState } from '../../../utils/setBrowserHistoryState';

/**
 * Types
 */

export type AppointmentAction =
  | { type: 'setIndex'; payload: AppointmentState['index'] }
  | { type: 'setLocation'; payload: AppointmentState['location'] }
  | { type: 'setDates'; payload: AppointmentState['dates'] }
  | { type: 'setDetails'; payload: AppointmentState['contact'] };

export type AppointmentDispatch = (action: AppointmentAction) => void;

export type AppointmentState = {
  index: number;
  location?: string;
  dates?: Record<number, Date>;
  contact?: ContactDetailsFormValues;
};

/**
 * State logic
 */

const appointmentReducer = (
  state: AppointmentState,
  action: AppointmentAction,
): AppointmentState => {
  switch (action.type) {
    case 'setIndex': {
      // Keep browser history in sync to enable browser back within form
      setBrowserHistoryState({ index: action.payload });
      // Make sure the question is in viewport after navigating
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
      return { ...state, index: action.payload };
    }
    case 'setLocation': {
      return { ...state, location: action.payload };
    }
    case 'setDates': {
      return { ...state, dates: action.payload };
    }
    case 'setDetails': {
      return { ...state, contact: action.payload };
    }
    default: {
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
    }
  }
};

const AppointmentStateContext = createContext<AppointmentState | null>(null);
const AppointmentDispatchContext = createContext<AppointmentDispatch | null>(
  null,
);

type AppointmentProviderProps = {
  children?: ReactElement | ReactElement[];
};

export const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
  const [state, dispatch] = useReducer(appointmentReducer, { index: 0 });

  const browserBackHandler = useCallback((event: PopStateEvent) => {
    const index = event.state.options.index;
    if (index >= 1) {
      dispatch({ type: 'setIndex', payload: index });
    } else {
      dispatch({ type: 'setIndex', payload: 0 });
    }
  }, []);

  useEffect(() => {
    if (state.index > 0)
      window.addEventListener('popstate', browserBackHandler);
    return () => window.removeEventListener('popstate', browserBackHandler);
  }, [state.index, browserBackHandler]);

  return (
    <AppointmentStateContext.Provider value={state}>
      <AppointmentDispatchContext.Provider value={dispatch}>
        {children}
      </AppointmentDispatchContext.Provider>
    </AppointmentStateContext.Provider>
  );
};

/**
 * Hooks / Helper
 */

export const useAppointmentContext = () => {
  const state = useContext(AppointmentStateContext);
  const dispatch = useContext(AppointmentDispatchContext);

  if (state == null || dispatch == null) {
    throw new Error(
      'useAppointmentContext must be used within a AppointmentProvider',
    );
  }

  return { state, dispatch };
};
