import { fireEvent, waitFor } from '@testing-library/react';
import { Country } from '../../../config/countries.config';
import { renderWithLayout } from '../../../jest.setup';
import { NextAPI } from '../../../lib/next/api/request';
import { setBrowserHistoryState } from '../../../utils/setBrowserHistoryState';
import { PostalCode } from '../components/PostalCode';
import { QuestionnaireProvider } from '../context/Questionnaire';

jest.mock('../../../utils/setBrowserHistoryState', () => ({
  setBrowserHistoryState: jest.fn(),
}));

jest.mock('../../../lib/next/api/request', () => ({
  NextAPI: {
    getPostalCodeDetails: jest.fn(),
  },
}));

const defaultPostalCodeDetails = [
  {
    zipcode: '22303',
    place: 'Hamburg Winterhude',
  },
  {
    zipcode: '22303',
    place: 'Hamburg',
  },
];

const PostalCodeWithContext = (props: { countries?: Country[] }) => (
  <QuestionnaireProvider>
    <PostalCode {...props} />
  </QuestionnaireProvider>
);

describe('PostalCode', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (NextAPI.getPostalCodeDetails as jest.Mock).mockReturnValue({
      status: 200,
      json: async () => ({ success: true, data: defaultPostalCodeDetails }),
    } as Response);
  });

  test('should render regular text input and no city selection if no country was given', () => {
    const { queryByLabelText, queryAllByRole } = renderWithLayout(
      <PostalCodeWithContext />,
    );

    expect(queryByLabelText(/stadt/i)).not.toBeInTheDocument();
    expect(queryAllByRole('textbox', { name: 'Postleitzahl' })).toHaveLength(1);
  });

  test('should render code input and city selection if single country was given', () => {
    const { queryByLabelText, queryAllByLabelText, rerender } =
      renderWithLayout(<PostalCodeWithContext countries={[Country.Germany]} />);

    expect(queryByLabelText(/stadt/i)).toBeInTheDocument();
    expect(queryAllByLabelText(/postleitzahl/i)).toHaveLength(5);

    rerender(<PostalCodeWithContext countries={[Country.Switzerland]} />);

    expect(queryByLabelText(/stadt/i)).toBeInTheDocument();
    expect(queryAllByLabelText(/postleitzahl/i)).toHaveLength(4);
  });

  test('should render regular text input and city selection if several countries were given', () => {
    const { queryByLabelText, queryAllByRole } = renderWithLayout(
      <PostalCodeWithContext
        countries={[Country.Germany, Country.Switzerland]}
      />,
    );

    expect(queryByLabelText(/stadt/i)).toBeInTheDocument();
    expect(queryAllByRole('textbox', { name: 'Postleitzahl' })).toHaveLength(1);
  });

  test('should fetch cities if code input has been filled completely', async () => {
    const { queryAllByLabelText, queryAllByRole } = renderWithLayout(
      <PostalCodeWithContext countries={[Country.Germany]} />,
    );

    expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(0);

    const inputs = queryAllByLabelText(/postleitzahl/i);
    fireEvent.change(inputs[0], { target: { value: 2 } });
    fireEvent.change(inputs[1], { target: { value: 2 } });
    fireEvent.change(inputs[2], { target: { value: 3 } });
    fireEvent.change(inputs[3], { target: { value: 0 } });
    fireEvent.change(inputs[4], { target: { value: 3 } });

    await waitFor(() => {
      expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(1);
      expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledWith({
        host: 'localhost',
        code: '22303',
        countries: [Country.Germany],
      });
      expect(queryAllByRole('option').length).toBe(2);
      expect(queryAllByRole('option')[0]).toHaveAttribute(
        'value',
        defaultPostalCodeDetails[0].place,
      );
    });
  });

  test('should reset city selection if digit of filled code input has been deleted', async () => {
    const { queryAllByLabelText, queryAllByRole } = renderWithLayout(
      <PostalCodeWithContext countries={[Country.Germany]} />,
    );

    expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(0);

    const inputs = queryAllByLabelText(/postleitzahl/i);
    fireEvent.change(inputs[0], { target: { value: 2 } });
    fireEvent.change(inputs[1], { target: { value: 2 } });
    fireEvent.change(inputs[2], { target: { value: 3 } });
    fireEvent.change(inputs[3], { target: { value: 0 } });
    fireEvent.change(inputs[4], { target: { value: 3 } });

    await waitFor(() => {
      expect(queryAllByRole('option').length).toBe(2);
      expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(inputs[4], { target: { value: '' } });

    await waitFor(() => {
      expect(queryAllByRole('option').length).toBe(0);
      expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(1);
    });
  });

  test('should render disabled button if there was no country given and there are less than 4 digits', async () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <PostalCodeWithContext />,
    );

    const input = getByLabelText(/postleitzahl/i);
    fireEvent.change(input, { target: { value: '223' } });

    await waitFor(() => {
      expect(getByRole('button')).toBeDisabled();
    });

    fireEvent.change(input, { target: { value: '2233' } });

    await waitFor(() => {
      expect(getByRole('button')).not.toBeDisabled();
    });
  });

  test('should render disabled button if there was an error', async () => {
    (NextAPI.getPostalCodeDetails as jest.Mock).mockReturnValue({
      status: 200,
      json: async () => ({ success: false, data: null }),
    } as Response);

    const { queryAllByLabelText, getByRole, getByText } = renderWithLayout(
      <PostalCodeWithContext countries={[Country.Germany]} />,
    );

    const inputs = queryAllByLabelText(/postleitzahl/i);
    fireEvent.change(inputs[0], { target: { value: 2 } });
    fireEvent.change(inputs[1], { target: { value: 2 } });
    fireEvent.change(inputs[2], { target: { value: 3 } });
    fireEvent.change(inputs[3], { target: { value: 3 } });
    fireEvent.change(inputs[4], { target: { value: 3 } });

    await waitFor(() => {
      expect(getByRole('button')).toBeDisabled();
      expect(
        getByText('Bitte geben Sie eine gültige Postleitzahl ein.'),
      ).toBeInTheDocument();
    });
  });

  test('should render disabled button if there were countries given and the code input is not completed', async () => {
    const { queryAllByLabelText, getByRole } = renderWithLayout(
      <PostalCodeWithContext countries={[Country.Germany]} />,
    );

    const inputs = queryAllByLabelText(/postleitzahl/i);
    fireEvent.change(inputs[0], { target: { value: 2 } });
    fireEvent.change(inputs[1], { target: { value: 2 } });
    fireEvent.change(inputs[2], { target: { value: 3 } });
    fireEvent.change(inputs[3], { target: { value: 3 } });

    await waitFor(() => {
      expect(getByRole('button')).toBeDisabled();
    });
  });

  test('should have correct context state if button has been clicked', async () => {
    const { queryAllByLabelText, getByRole } = renderWithLayout(
      <PostalCodeWithContext countries={[Country.Germany]} />,
    );

    const inputs = queryAllByLabelText(/postleitzahl/i);
    fireEvent.change(inputs[0], { target: { value: 2 } });
    fireEvent.change(inputs[1], { target: { value: 2 } });
    fireEvent.change(inputs[2], { target: { value: 3 } });
    fireEvent.change(inputs[3], { target: { value: 3 } });

    await waitFor(() => {
      expect(getByRole('button')).toBeDisabled();
    });
  });

  test('should go to next step if button has been clicked', async () => {
    const { getByLabelText, getByRole } = renderWithLayout(
      <PostalCodeWithContext />,
    );

    expect(setBrowserHistoryState as jest.Mock).toHaveBeenCalledTimes(0);

    fireEvent.change(getByLabelText(/postleitzahl/i), {
      target: { value: 22303 },
    });
    fireEvent.click(getByRole('button'));

    await waitFor(() => {
      expect(setBrowserHistoryState as jest.Mock).toHaveBeenCalledTimes(1);
    });
  });

  test('should not fetch cities during re-renderings if code input stayed the same', async () => {
    const { queryAllByLabelText } = renderWithLayout(
      <QuestionnaireProvider>
        <PostalCode countries={[Country.Germany]} />
      </QuestionnaireProvider>,
    );

    expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(0);

    const inputs = queryAllByLabelText(/postleitzahl/i);
    fireEvent.change(inputs[0], { target: { value: 2 } });
    fireEvent.change(inputs[1], { target: { value: 2 } });
    fireEvent.change(inputs[2], { target: { value: 3 } });
    fireEvent.change(inputs[3], { target: { value: 0 } });
    fireEvent.change(inputs[4], { target: { value: 3 } });

    await waitFor(() => {
      expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(inputs[4], { target: { value: 3 } });

    await waitFor(() => {
      expect(NextAPI.getPostalCodeDetails).toHaveBeenCalledTimes(1);
    });
  });
});
