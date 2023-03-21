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

    const salutationFrau = getByLabelText(
      ContactFieldConfig.Salutation.label[0],
    );
    expect(salutationFrau).toBeInTheDocument();

    const salutationHerr = getByLabelText(
      ContactFieldConfig.Salutation.label[1],
    );
    expect(salutationHerr).toBeInTheDocument();

    const firstName = getByLabelText(ContactFieldConfig.FirstName.label);
    expect(firstName).toBeInTheDocument();
    expect(firstName).toHaveAttribute('type', 'text');

    const lastName = getByLabelText(ContactFieldConfig.LastName.label);
    expect(lastName).toBeInTheDocument();
    expect(lastName).toHaveAttribute('type', 'text');

    const email = getByLabelText(ContactFieldConfig.Email.label);
    expect(email).toBeInTheDocument();
    expect(email).toHaveAttribute('type', 'email');

    const phone = getByLabelText(ContactFieldConfig.Phone.label);
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveAttribute('type', 'text');

    const accepted = getByLabelText(
      'Ja, ich stimme der Datenschutzerklärung zu. (Widerruf jederzeit möglich)',
    );
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
