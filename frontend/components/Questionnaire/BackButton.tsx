import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/material-rounded';

import { useQuestionnaireContext } from '../../context/Questionnaire';

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

export const BackButton: React.FunctionComponent = () => {
  const { state, dispatch } = useQuestionnaireContext();
  if (state.currentIndex === 0) return <></>;

  const onClickHandler: React.MouseEventHandler = () => {
    dispatch({
      type: 'SET_CURRENT_INDEX',
      payload: { newIndex: state.currentIndex - 1 },
    });
  };

  return (
    <StyledBackButton onClick={onClickHandler}>
      <ChevronLeft width={32} style={{ marginLeft: '-0.1rem' }} />
    </StyledBackButton>
  );
};
