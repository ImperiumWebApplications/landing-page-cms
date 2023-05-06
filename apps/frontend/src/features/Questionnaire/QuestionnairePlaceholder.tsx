import React from 'react';
import { useRouter } from 'next/router';

import { useLanguageContext } from '../../context/Language';
import { i18n } from '../../config/i18n.config';

export const QuestionnairePlaceholder: React.FC = () => {
  const { language } = useLanguageContext();
  const router = useRouter();

  return (
    <div id="placeholder" className="my-16 mx-auto text-center">
      <div className="content-wrapper">
        <h1 className="my-8 text-2xl">{i18n[language].NOT_FOUND}</h1>
        <button
          className="cursor-pointer rounded-md border-none bg-primary py-3 px-4 text-base text-[white] hover:brightness-110"
          type="button"
          onClick={() => router.back()}
        >
          {i18n[language].NOT_FOUND_ACTION}
        </button>
      </div>
    </div>
  );
};
