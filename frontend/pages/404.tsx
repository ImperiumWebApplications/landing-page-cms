import type { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className="flex items-center justify-center py-[20%] text-center font-system text-base font-normal tracking-wide text-[#aaa69d]">
      <main>
        <h1 className="text-2xl">404 – Diese Seite existiert leider nicht.</h1>
        <p>
          <Link
            href="/"
            className="rounded-sm bg-[#aaa69d] py-[0.15rem] px-1 text-sm font-bold text-[white] no-underline"
          >
            Hier
          </Link>{' '}
          kehrst du zur Startseite zurück.
        </p>
      </main>
    </div>
  );
};

export default NotFoundPage;
