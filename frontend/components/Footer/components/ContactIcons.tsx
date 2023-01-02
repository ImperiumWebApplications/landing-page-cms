import Link from 'next/link';
import cx from 'classnames';

import { ChevronUpIcon, MailIcon, TelephoneIcon } from '../../Icons';

export const ContactIcons: React.FunctionComponent<{
  phone?: string | null;
  email?: string | null;
}> = ({ phone, email }) => {
  const classes =
    'mr-4 h-11 w-11 cursor-pointer rounded-md border-2 border-solid border-tertiary p-2 transition-all hover:border-secondary lg:mr-8 lg:h-12 lg:w-12';

  return (
    <div className="flex md:items-center md:justify-center">
      {phone ? (
        <Link href={`tel:${phone}`} className={classes} aria-label="Telephone">
          <TelephoneIcon className="fill-tertiary" />
        </Link>
      ) : null}
      {email ? (
        <Link href={`mailto:${email}`} className={classes} aria-label="Email">
          <MailIcon />
        </Link>
      ) : null}
      <div
        className={cx(classes, 'relative border-[transparent] bg-tertiary')}
        onClick={() => window.scrollTo(0, 0)}
      >
        <ChevronUpIcon className="fill-primary" />
      </div>
    </div>
  );
};
