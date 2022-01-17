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
`;

export const PostalCode: React.FunctionComponent = () => {
  const { state, dispatch } = useQuestionnaireContext();
  const { label, value: initialValue } = state.contact.postalCode;
  const theme = useTheme();

  return (
    <StyledPostalCode>
      <StyledStepTitle className="title">
        Wunderbar! Nennen Sie uns jetzt bitte Ihre Postleitzahl:
      </StyledStepTitle>
      <div className="input">
        <TextInput
          type="text"
          field="postalCode"
          pattern="[0-9]*"
          label={label}
          initialValue={initialValue}
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
          onClickHandler={() => goToStep(dispatch, state.currentIndex + 1)}
          icon={
            <NavigateNext
              width={24}
              height={24}
              style={{ marginBottom: '3px' }}
            />
          }
          fullWidth
        />
      </div>
    </StyledPostalCode>
  );
};
