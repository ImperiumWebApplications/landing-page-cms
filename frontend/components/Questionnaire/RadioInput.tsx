import slugify from 'slugify';
import styled from 'styled-components';

import type { RadioFields } from '../../context/Questionnaire/state';
import { useQuestionnaireContext } from '../../context/Questionnaire';
import { devices } from '../../config/breakpoints.config';

const StyledRadioInput = styled.div`
  grid-column: 1 / 3;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.5rem;

  @media screen and (${devices.sm}) {
    column-gap: 4rem;
  }

  .option {
    input[type='radio'] {
      position: absolute;
      visibility: hidden;

      &:checked ~ label::before {
        background-color: ${({ theme }) => theme.colors.secondary};
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' height='18' width='18' focusable='false' role='img' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z'%3E%3C/path%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border: 2px solid ${({ theme }) => theme.colors.secondary};
      }

      &:hover:not(:checked) ~ label::before {
        border: 2px solid ${({ theme }) => theme.colors.secondary};
      }
    }

    label {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      letter-spacing: +0.25px;
      font-size: 0.9rem;

      @media screen and (${devices.md}) {
        font-size: 1rem;
      }

      &::before {
        content: '';
        display: inline-block;
        background-color: white;
        border-radius: 45% 55% 48% 52% / 50% 46% 54% 50%;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.75rem;
        border: 2px solid ${({ theme }) => theme.colors.tertiary};
      }
    }
  }
`;

export const RadioInput: React.FunctionComponent<{
  field: keyof RadioFields;
  options: string[];
}> = ({ field, options }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const { value } = state.contact[field];

  return (
    <StyledRadioInput>
      {options.map((option, key) => {
        const inputId = slugify(`${field}-${option}`);
        return (
          <div className="option" key={key}>
            <input
              type="radio"
              id={inputId}
              name={inputId}
              value={option}
              checked={option === value}
              onChange={(event) => {
                dispatch({
                  type: 'SET_CONTACT_DETAILS',
                  payload: { field, value: event.target.value },
                });
              }}
            />
            <label htmlFor={inputId}>{option}</label>
          </div>
        );
      })}
    </StyledRadioInput>
  );
};
