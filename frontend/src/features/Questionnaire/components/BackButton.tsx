import { useQuestionnaireContext } from '../context/Questionnaire';
import { ChevronLeftIcon } from '../../../components/Icons';

export const BackButton: React.FC<{ hide?: boolean }> = ({ hide }) => {
  const { state, dispatch } = useQuestionnaireContext();
  if (hide) return <></>;

  const onClickHandler: React.MouseEventHandler = () => {
    dispatch({ type: 'setIndex', payload: { index: state.index - 1 } });
  };

  return (
    <div
      className="absolute top-[1rem] left-[1rem] flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-tertiary hover:brightness-105"
      aria-label="Einen Schritt zurück"
      onClick={onClickHandler}
    >
      <ChevronLeftIcon className="-ml-[0.1rem] h-8 w-8" />
    </div>
  );
};
