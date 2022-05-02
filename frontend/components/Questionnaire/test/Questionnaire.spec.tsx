import { fireEvent } from '@testing-library/react';
import { QuestionnaireContextProvider } from '../../../context/Questionnaire';
import { renderWithLayout } from '../../../jest.setup';
import { Questionnaire, QuestionnaireProps } from '../Questionnaire';

const defaultProps: QuestionnaireProps = {
  questions: [
    {
      id: 1,
      question: 'Was suchen Sie?',
      answers: [
        { id: 1, answer_value: 'Haus' },
        { id: 2, answer_value: 'Garten' },
      ],
    },
    {
      id: 2,
      question: 'Wo soll es sein?',
      answers: [
        { id: 3, answer_value: 'Norden' },
        { id: 4, answer_value: 'Süden' },
      ],
    },
  ],
  advantages: [
    { first_line: 'Erste Zeile', id: 1, second_line: 'Zweite Zeile' },
  ],
  phone: '0123456789',
  countries: undefined,
  customSelectHandler: undefined,
};

const QuestionnaireWithContext = (
  props: QuestionnaireProps | Record<string, unknown>,
) => (
  <QuestionnaireContextProvider>
    <Questionnaire {...defaultProps} {...props} />
  </QuestionnaireContextProvider>
);

/**
 * This test suite only covers the browser history interface.
 * Behavioral tests for the questionnaire are covered by Cypress.
 */

describe('Questionnaire', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should initialize browser history correctly', () => {
    renderWithLayout(<QuestionnaireWithContext />);
    expect(window.history.state).toEqual({ step: 0 });
  });

  test('should update state when going to next step', () => {
    const { queryAllByRole } = renderWithLayout(<QuestionnaireWithContext />);
    expect(window.history.state).toEqual({ step: 0 });
    fireEvent.click(queryAllByRole('button')[0]);
    expect(window.history.state).toEqual({ step: 1 });
  });

  test('should update state when going to previous step', () => {
    const { getAllByRole, getByLabelText } = renderWithLayout(
      <QuestionnaireWithContext />,
    );
    fireEvent.click(getAllByRole('button')[0]);
    expect(window.history.state).toEqual({ step: 1 });
    fireEvent.click(getByLabelText('Einen Schritt zurück'));
    expect(window.history.state).toEqual({ step: 0 });
  });

  test('should use custom click handler for questions', () => {
    const selectHandlerMock = jest.fn();
    const { getAllByRole } = renderWithLayout(
      <QuestionnaireWithContext customSelectHandler={selectHandlerMock} />,
    );

    expect(selectHandlerMock).toHaveBeenCalledTimes(0);
    fireEvent.click(getAllByRole('button')[0]);
    expect(selectHandlerMock).toHaveBeenCalledTimes(1);
    expect(selectHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        input: {
          question: { id: 1, value: 'Was suchen Sie?' },
          answer: { id: 1, value: 'Haus' },
        },
      }),
    );
  });

  test('should switch to postal code step at end of questions array', () => {
    const { getAllByRole, queryByLabelText } = renderWithLayout(
      <QuestionnaireWithContext />,
    );

    expect(queryByLabelText(/postleitzahl/i)).not.toBeInTheDocument();
    fireEvent.click(getAllByRole('button')[0]);
    fireEvent.click(getAllByRole('button')[0]);
    expect(queryByLabelText(/postleitzahl/i)).toBeInTheDocument();
  });
});
