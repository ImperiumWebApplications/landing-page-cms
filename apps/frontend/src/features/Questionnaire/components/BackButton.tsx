import cx from 'classnames';

import { useQuestionnaireContext } from '../context/Questionnaire';
import { useLanguageContext } from '../../../context/Language';
import { ChevronLeftIcon } from '../../../components/Icons';
import { i18n } from '../../../config/i18n.config';

export const BackButton: React.FC<{ className?: string }> = ({ className }) => {
  const { state, dispatch } = useQuestionnaireContext();
  const { language } = useLanguageContext();

  const onClickHandler: React.MouseEventHandler = () => {
    if (state.index !== 0) {
      dispatch({ type: 'setIndex', payload: { index: state.index - 1 } });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div
      className={cx(
        'flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[black]/10 hover:brightness-105',
        className,
      )}
      data-testid="questionnaire-back-button"
      aria-label={i18n[language].BACK}
      onClick={onClickHandler}
    >
      <ChevronLeftIcon className="-ml-[0.1rem] h-4 stroke-gray" />
    </div>
  );
};
