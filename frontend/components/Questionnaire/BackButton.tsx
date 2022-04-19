import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/material-rounded';

import { useQuestionnaireContext } from '../../context/Questionnaire';
import { goToStep } from '../../utils/goToStep';

const StyledBackButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.tertiary};

  @media (hover) {
    &:hover {
      filter: brightness(105%);
    }
  }
`;

export const BackButton: React.FunctionComponent<{ hide?: boolean }> = ({
  hide,
}) => {
  const { state, dispatch } = useQuestionnaireContext();
  if (hide) return <></>;

  const onClickHandler: React.MouseEventHandler = () => {
    goToStep(dispatch, state.currentIndex - 1);
  };

  return (
    <StyledBackButton
      aria-label="Einen Schritt zurück"
      onClick={onClickHandler}
    >
      <ChevronLeft width={32} style={{ marginLeft: '-0.1rem' }} />
    </StyledBackButton>
  );
};
