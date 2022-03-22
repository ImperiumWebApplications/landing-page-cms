import React from 'react';
import styled, { useTheme } from 'styled-components';
import { InfoCircle } from '@styled-icons/bootstrap';
import { NavigateNext } from '@styled-icons/material-rounded';

import { useQuestionnaireContext } from '../../context/Questionnaire';
import { StyledStepTitle } from './StepTitle';
import { TextInput } from './TextInput';
import { Button } from '../Button';
import { devices } from '../../config/breakpoints.config';
import { goToStep } from '../../utils/goToStep';
import { formFieldValidations } from '../../config/form.config';

const StyledPostalCode = styled.div`
  max-width: 45rem;
  margin: 0 auto;

  .input {
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;

    .hint {
      display: flex;
      margin: 1rem 0 2rem 0;
      font-size: 0.9rem;
      line-height: 1.25rem;

      @media screen and (${devices.sm}) {
        margin: 1rem 0 4rem 0;
      }

      svg {
        flex-shrink: 0;
      }

      span {
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
  }

  span.error {
    display: block;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: red;
    opacity: 0.75;
  }
`;

export const PostalCode: React.FunctionComponent = () => {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { state, dispatch } = useQuestionnaireContext();
  const { label } = state.contact.postalCode;
  const theme = useTheme();

  const onClickHandler: React.MouseEventHandler = () => {
    if (state.contact.postalCode.value.trim() === '') {
      setError('Bitte geben Sie Ihre Postleitzahl an.');
      return;
    }

    goToStep(dispatch, state.currentIndex + 1);
  };

  return (
    <StyledPostalCode>
      <StyledStepTitle className="title">
        Wunderbar!
        <br /> Nennen Sie uns jetzt bitte Ihre Postleitzahl:
      </StyledStepTitle>
      <div className="input">
        <TextInput
          type="text"
          field="postalCode"
          pattern="[0-9]*"
          label={label}
          validations={formFieldValidations.postalCode}
        />
        <div className="hint">
          <InfoCircle
            color={theme.colors.secondary}
            width={16}
            height={16}
            fontWeight={700}
          />
          <span>Für die Suche nach dem idealen Anbieter in Ihrer Region</span>
        </div>
        <Button
          label="Weiter"
          onClickHandler={onClickHandler}
          icon={
            <NavigateNext
              width={24}
              height={24}
              style={{ marginBottom: '3px' }}
            />
          }
          fullWidth
        />
        {error && <span className="error">{error}</span>}
      </div>
    </StyledPostalCode>
  );
};
