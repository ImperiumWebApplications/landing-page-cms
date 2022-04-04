import { QuestionnaireContextState } from '../../context/Questionnaire/state';
import { isFormDataComplete } from '../isFormDataComplete';

const DEFAULT_FORM_DATA = {
  contact: {
    salutation: {
      type: 'radio',
      value: 'Frau',
      options: ['Frau', 'Herr'],
    },
    firstName: {
      type: 'text',
      value: 'Peter',
    },
    lastName: {
      type: 'text',
      value: 'Test',
    },
    email: {
      type: 'email',
      value: 'test@kmuenster.com',
    },
    phone: {
      type: 'text',
      value: '015128888107',
    },
    postalCode: {
      type: 'text',
      value: '22303',
    },
    city: {
      type: 'text',
      value: 'Hamburg',
    },
    acceptedTerms: {
      type: 'checkbox',
      value: true,
    },
  },
};

describe('isFormDataComplete', () => {
  it('should return false for missing text value', () => {
    expect(
      isFormDataComplete({
        contact: {
          ...DEFAULT_FORM_DATA.contact,
          lastName: {
            ...DEFAULT_FORM_DATA.contact.lastName,
            value: '',
          },
        },
      } as unknown as QuestionnaireContextState),
    ).toBeFalsy();

    expect(
      isFormDataComplete({
        contact: {
          ...DEFAULT_FORM_DATA.contact,
          lastName: {
            ...DEFAULT_FORM_DATA.contact.lastName,
            value: '     ',
          },
        },
      } as unknown as QuestionnaireContextState),
    ).toBeFalsy();

    expect(
      isFormDataComplete({
        contact: {
          ...DEFAULT_FORM_DATA.contact,
          salutation: {
            ...DEFAULT_FORM_DATA.contact.salutation,
            value: '',
          },
        },
      } as unknown as QuestionnaireContextState),
    ).toBeFalsy();
  });

  it('should return false for missing boolean value', () => {
    expect(
      isFormDataComplete({
        contact: {
          ...DEFAULT_FORM_DATA.contact,
          acceptedTerms: {
            ...DEFAULT_FORM_DATA.contact.acceptedTerms,
            value: false,
          },
        },
      } as unknown as QuestionnaireContextState),
    ).toBeFalsy();
  });

  it('should return true for missing hidden form field value', () => {
    expect(
      isFormDataComplete({
        contact: {
          ...DEFAULT_FORM_DATA.contact,
          city: {
            ...DEFAULT_FORM_DATA.contact.city,
            value: '',
          },
        },
      } as unknown as QuestionnaireContextState),
    ).toBeTruthy();

    expect(
      isFormDataComplete({
        contact: {
          ...DEFAULT_FORM_DATA.contact,
          city: {
            ...DEFAULT_FORM_DATA.contact.city,
            value: 'Hello',
          },
        },
      } as unknown as QuestionnaireContextState),
    ).toBeTruthy();
  });

  it('should return true if all fields are filled', () => {
    expect(
      isFormDataComplete(
        DEFAULT_FORM_DATA as unknown as QuestionnaireContextState,
      ),
    ).toBeTruthy();
  });
});
