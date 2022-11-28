import {
  fireEvent,
  Matcher,
  renderWithLayout,
  SelectorMatcherOptions,
} from '../../../jest.setup';
import { sendEventToAnalytics } from '../../../lib/analytics/sendEventToAnalytics';
import { isTrackingAllowed } from '../../../lib/analytics/isTrackingAllowed';
import { waitFor } from '@testing-library/react';
import { QuestionnaireProvider } from '../context/Questionnaire';
import { ContactForm } from '../components/ContactForm';
import { setBrowserHistoryState } from '../../../utils/setBrowserHistoryState';
import { NextAPI } from '../../../lib/next/api';

jest.mock('../../../lib/analytics/isTrackingAllowed', () => ({
  isTrackingAllowed: jest.fn(),
}));

jest.mock('../../../utils/setBrowserHistoryState', () => ({
  setBrowserHistoryState: jest.fn(),
}));

jest.mock('../../../lib/analytics/sendEventToAnalytics', () => ({
  sendEventToAnalytics: jest.fn(),
  TagManagerEvents: {
    QuestionnaireSubmitted: 'questionnaire_submitted',
  },
}));

jest.mock('../../../lib/next/api', () => ({
  NextAPI: {
    createLead: jest.fn(),
  },
}));

const fillContactForm = (
  fieldSelector: (
    id: Matcher,
    options?: SelectorMatcherOptions | undefined,
  ) => HTMLElement,
) => {
  fireEvent.click(fieldSelector('Frau'));
  fireEvent.change(fieldSelector('Vorname'), {
    target: { value: 'Vorname' },
  });
  fireEvent.change(fieldSelector('Nachname'), {
    target: { value: 'Nachame' },
  });
  fireEvent.change(fieldSelector('E-Mail Adresse'), {
    target: { value: 'Email' },
  });
  fireEvent.change(fieldSelector('Telefonnummer'), {
    target: { value: '0123456789' },
  });
  fireEvent.click(
    fieldSelector(
      'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
    ),
  );
};

const ContactFormWithContext = () => (
  <QuestionnaireProvider>
    <ContactForm />
  </QuestionnaireProvider>
);

describe('ContactForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (NextAPI.createLead as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
    } as Response);
  });

  test('should render fields correctly', () => {
    const { getByLabelText } = renderWithLayout(<ContactFormWithContext />);

    expect(getByLabelText('Frau')).toBeInTheDocument();
    expect(getByLabelText('Frau')).toHaveAttribute('type', 'radio');

    expect(getByLabelText('Herr')).toBeInTheDocument();
    expect(getByLabelText('Herr')).toHaveAttribute('type', 'radio');

    expect(getByLabelText('Vorname')).toBeInTheDocument();
    expect(getByLabelText('Vorname')).toHaveAttribute('type', 'text');

    expect(getByLabelText('Nachname')).toBeInTheDocument();
    expect(getByLabelText('Nachname')).toHaveAttribute('type', 'text');

    expect(getByLabelText('E-Mail Adresse')).toBeInTheDocument();
    expect(getByLabelText('E-Mail Adresse')).toHaveAttribute('type', 'email');

    expect(getByLabelText('Telefonnummer')).toBeInTheDocument();
    expect(getByLabelText('Telefonnummer')).toHaveAttribute('type', 'text');
    expect(
      getByLabelText(
        'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
      ),
    ).toBeInTheDocument();
    expect(
      getByLabelText(
        'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
      ),
    ).toHaveAttribute('type', 'checkbox');
  });

  test('should render disabled button if form data is incomplete', () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(getByRole('button')).toBeDisabled();
    fillContactForm(getByLabelText);
    expect(getByRole('button')).not.toBeDisabled();
  });

  test('should render error message correctly', async () => {
    (NextAPI.createLead as jest.Mock).mockRejectedValue({
      status: 500,
      ok: false,
    } as Response);

    const { queryByText, getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(queryByText(/Fehler beim Abschicken/i)).not.toBeInTheDocument();
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    expect(queryByText(/Fehler beim Abschicken/i)).toBeInTheDocument();
  });

  test('should invoke tracking event on submit', async () => {
    (isTrackingAllowed as jest.Mock).mockReturnValueOnce(true);

    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(sendEventToAnalytics).toHaveBeenCalledTimes(0);
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(() => {
      expect(sendEventToAnalytics).toHaveBeenCalledTimes(1);
      expect(sendEventToAnalytics).toHaveBeenCalledWith(
        'questionnaire_submitted',
      );
    });
  });

  test('should go to next step on submit and sync browser history', async () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(setBrowserHistoryState).toHaveBeenCalledTimes(0);
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(() => {
      expect(setBrowserHistoryState).toHaveBeenCalledTimes(1);
      expect(setBrowserHistoryState).toHaveBeenCalledWith({ index: 1 });
    });
  });

  test('should invoke API with correct payload', async () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(NextAPI.createLead).toHaveBeenCalledTimes(0);
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(() => {
      expect(NextAPI.createLead).toHaveBeenCalledTimes(1);
      expect(NextAPI.createLead).toHaveBeenCalledWith({
        contact: {
          acceptedTerms: true,
          email: 'Email',
          firstName: 'Vorname',
          lastName: 'Nachame',
          phone: '0123456789',
          salutation: 'Frau',
        },
        domain: 'localhost',
        questionnaireResults: [],
      });
    });
  });
});
