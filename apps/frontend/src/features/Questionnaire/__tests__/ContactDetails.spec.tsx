import { fireEvent, renderWithLayout } from '../../../../jest.setup';
// import { sendEventToAnalytics } from '../../../lib/analytics/sendEventToAnalytics';
// import { isTrackingAllowed } from '../../../lib/analytics/isTrackingAllowed';
import { waitFor } from '@testing-library/react';
import { QuestionnaireProvider } from '../context/Questionnaire';
import { setBrowserHistoryState } from '../../../utils/setBrowserHistoryState';
import { NextAPI } from '../../../lib/next/api/client';
import { ContactDetails as StatelessContactDetails } from '../components/ContactDetails';
import { staticContent } from '../../../../mocks/lib/strapi/data';
import {
  isTrackingAllowed,
  sendEventToAnalytics,
} from '../../../lib/analytics';

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

jest.mock('../../../lib/next/api/client', () => ({
  NextAPI: {
    createLead: jest.fn(),
  },
}));

const ContactDetails = () => (
  <QuestionnaireProvider
    initialState={{
      index: 0,
      questionnaire: [],
      contact: {
        salutation: 'Herr',
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.de',
        phone: '123456789',
        acceptedTerms: true,
      },
    }}
  >
    <StatelessContactDetails
      staticContent={staticContent.data.attributes.questionnaire}
    />
  </QuestionnaireProvider>
);

describe('ContactDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (NextAPI.createLead as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
    } as Response);
  });

  test('should invoke tracking event on submit', async () => {
    (isTrackingAllowed as jest.Mock).mockReturnValueOnce(true);

    const { getByRole } = renderWithLayout(<ContactDetails />);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(
      () => {
        expect(sendEventToAnalytics).toHaveBeenCalledTimes(1);
        expect(sendEventToAnalytics).toHaveBeenCalledWith(
          'questionnaire_submitted',
        );
      },
      { timeout: 5000 },
    );
  });

  test('should go to next step on submit and sync browser history', async () => {
    const { getByRole } = renderWithLayout(<ContactDetails />);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(
      () => {
        expect(setBrowserHistoryState).toHaveBeenCalledTimes(1);
        expect(setBrowserHistoryState).toHaveBeenCalledWith({ index: 1 });
      },
      { timeout: 5000 },
    );
  });

  test('should invoke API with correct payload', async () => {
    const { getByRole } = renderWithLayout(<ContactDetails />);

    await waitFor(() => {
      fireEvent.click(getByRole('button'));
    });

    await waitFor(() => {
      expect(NextAPI.createLead).toHaveBeenCalledTimes(1);
      expect(NextAPI.createLead).toHaveBeenCalledWith({
        contact: {
          salutation: 'Herr',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@test.de',
          phone: '123456789',
          acceptedTerms: true,
        },
        domain: 'localhost',
        questionnaireResults: [],
      });
    });
  });
});
