import React from 'react';
import { useRouter } from 'next/router';

import type { LandingPage } from '../../lib/strapi';

import { QuestionMarkBadgeIcon } from '../../components/Icons';
import { Layout } from '../../components/Layout';

export const QuestionnairePlaceholderPage: React.FC<{
  content: LandingPage;
}> = ({ content }) => {
  return (
    <Layout content={content}>
      <QuestionnairePlaceholder />
    </Layout>
  );
};

export const QuestionnairePlaceholder = () => {
  const router = useRouter();

  return (
    <div id="placeholder" className="my-16 mx-auto text-center">
      <div className="content-wrapper">
        <QuestionMarkBadgeIcon width={200} height={200} opacity={0.25} />
        <h1 className="my-8 text-2xl">
          Leider konnte der aufgerufene Inhalt nicht geladen werden...
        </h1>
        <button
          className="cursor-pointer rounded-md border-none bg-primary py-3 px-4 text-base text-[white] hover:brightness-110"
          type="button"
          onClick={() => router.back()}
        >
          Zurück zur letzten Seite
        </button>
      </div>
    </div>
  );
};
