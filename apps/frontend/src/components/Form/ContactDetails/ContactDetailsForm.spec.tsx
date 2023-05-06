import { useState } from 'react';
import {
  fireEvent,
  Matcher,
  render,
  SelectorMatcherOptions,
} from '../../../../jest.setup';

import {
  ContactDetailsForm,
  ContactDetailsFormValues,
} from './ContactDetailsForm';
import { ContactFieldConfig } from './ContactDetailsForm.config';

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
    target: { value: 'test@test.de' },
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

const ContactDetailsWrapper = (props: { onSubmit?: () => Promise<void> }) => {
  const [details, setDetails] = useState<ContactDetailsFormValues>();
  return (
    <ContactDetailsForm
      language="German"
      onSubmit={props.onSubmit}
      values={details}
      setValues={(values) => {
        setDetails(values);
      }}
    />
  );
};

describe('ContactDetailsForm', () => {
  test('should render fields correctly', () => {
    const { getByLabelText } = render(<ContactDetailsWrapper />);

    const { Salutation, FirstName, LastName, Email, Phone, TermsAccepted } =
      ContactFieldConfig;

    const salutationFrau = getByLabelText(
      Salutation.getConfig('German').label[0],
    );
    expect(salutationFrau).toBeInTheDocument();

    const salutationHerr = getByLabelText(
      Salutation.getConfig('German').label[1],
    );
    expect(salutationHerr).toBeInTheDocument();

    const firstName = getByLabelText(FirstName.getConfig('German').label);
    expect(firstName).toBeInTheDocument();
    expect(firstName).toHaveAttribute('type', 'text');

    const lastName = getByLabelText(LastName.getConfig('German').label);
    expect(lastName).toBeInTheDocument();
    expect(lastName).toHaveAttribute('type', 'text');

    const email = getByLabelText(Email.getConfig('German').label);
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('type', 'email');

    const phone = getByLabelText(Phone.getConfig('German').label);
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveAttribute('type', 'text');

    const accepted = getByLabelText(TermsAccepted.getConfig('German').label);
    expect(accepted).toBeInTheDocument();
    expect(accepted).toHaveAttribute('type', 'checkbox');
  });

  test('should show error message if form data is invalid on submit', async () => {
    const { findByText, getByTestId } = render(<ContactDetailsWrapper />);

    fireEvent.click(getByTestId('contact-details-form-submit'));
    await findByText(/Bitte füllen Sie alle Felder korrekt aus./i);
  });

  test('should render error message', async () => {
    const { findByText, getByLabelText, getByTestId } = render(
      <ContactDetailsWrapper onSubmit={() => Promise.reject('Failed fetch')} />,
    );

    fillContactForm(getByLabelText);

    fireEvent.click(getByTestId('contact-details-form-submit'));
    await findByText(/Fehler/i);
  });
});
