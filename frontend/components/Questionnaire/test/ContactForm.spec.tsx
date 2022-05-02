import { QuestionnaireContextProvider } from '../../../context/Questionnaire';
import {
  fireEvent,
  Matcher,
  renderWithLayout,
  SelectorMatcherOptions,
} from '../../../jest.setup';
import { ContactForm } from '../ContactForm';
import { NextAPI } from '../../../lib/api/request';
import { goToStep } from '../../../utils/goToStep';
import { sendEventToAnalytics } from '../../../lib/analytics/sendEventToAnalytics';
import { waitFor } from '@testing-library/react';

jest.mock('../../../lib/analytics/sendEventToAnalytics', () => ({
  sendEventToAnalytics: jest.fn(),
}));

jest.mock('../../../utils/goToStep', () => ({
  goToStep: jest.fn(),
}));

jest.mock('../../../lib/api/request', () => ({
  NextAPI: {
    createLeadInPipedrive: jest.fn(),
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
  <QuestionnaireContextProvider>
    <ContactForm />
  </QuestionnaireContextProvider>
);

describe('ContactForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (NextAPI.createLeadInPipedrive as jest.Mock).mockResolvedValue({
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
    (NextAPI.createLeadInPipedrive as jest.Mock).mockRejectedValue({
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
    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(sendEventToAnalytics).toHaveBeenCalledTimes(0);
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
      expect(sendEventToAnalytics).toHaveBeenCalledTimes(1);
    });
  });

  test('should go to next step on submit', async () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(goToStep).toHaveBeenCalledTimes(0);
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
      expect(goToStep).toHaveBeenCalledTimes(1);
    });
  });

  test('should invoke API with correct payload', async () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <ContactFormWithContext />,
    );

    expect(NextAPI.createLeadInPipedrive).toHaveBeenCalledTimes(0);
    fillContactForm(getByLabelText);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(() => {
      expect(NextAPI.createLeadInPipedrive).toHaveBeenCalledTimes(1);
      expect(NextAPI.createLeadInPipedrive).toHaveBeenCalledWith({
        contact: {
          acceptedTerms: {
            label:
              'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
            type: 'checkbox',
            value: true,
          },
          city: { label: 'Stadt', type: 'text', value: '' },
          email: { label: 'E-Mail Adresse', type: 'email', value: 'Email' },
          firstName: { label: 'Vorname', type: 'text', value: 'Vorname' },
          lastName: { label: 'Nachname', type: 'text', value: 'Nachame' },
          phone: { label: 'Telefonnummer', type: 'text', value: '0123456789' },
          postalCode: { label: 'Postleitzahl', type: 'text', value: '' },
          salutation: {
            options: ['Frau', 'Herr'],
            type: 'radio',
            value: 'Frau',
          },
        },
        host: 'localhost',
        questionnaire: [],
      });
    });
  });
});
