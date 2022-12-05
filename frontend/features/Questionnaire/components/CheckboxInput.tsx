import slugify from 'slugify';
import styled from 'styled-components';

import { devices } from '../../../config/breakpoints.config';
import { ContactFields } from '../../../config/form.config';
import { useQuestionnaireContext } from '../context/Questionnaire';

const StyledCheckboxInput = styled.div`
  grid-column: 1 / 3;
  margin-top: 1rem;

  input[type='checkbox'] {
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
    line-height: 1.125rem;
    font-size: 0.9rem;

    // Handling long words and links
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;

    @media screen and (${devices.md}) {
      line-height: 1.25rem;
      font-size: 1rem;
    }

    &::before {
      content: '';
      display: inline-block;
      flex-shrink: 0;
      background-color: white;
      border-radius: ${({ theme }) => theme.borderRadius};
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.75rem;
      border: 2px solid ${({ theme }) => theme.colors.tertiary};
    }
  }
`;

export const CheckboxInput: React.FunctionComponent<{
  field: typeof ContactFields[keyof typeof ContactFields];
  label: string;
}> = ({ field, label }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const inputId = slugify(`${field}`);

  return (
    <StyledCheckboxInput>
      <input
        type="checkbox"
        name={inputId}
        id={inputId}
        checked={!!state.contact[field]}
        onChange={() => {
          dispatch({
            type: 'setDetails',
            payload: { field, value: !state.contact[field] },
          });
        }}
      />
      <label htmlFor={inputId}>{label}</label>
    </StyledCheckboxInput>
  );
};