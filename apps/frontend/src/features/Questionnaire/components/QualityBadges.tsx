import Image from 'next/image';

const badges = [
  {
    href: 'https://kagu-media.de/kostenloses-guetesiegel-fuer-ihre-webseite/',
    badgeSrc: '/images/kagu-gepruefte-webseite.png',
  },
  {
    href: 'https://tech-aktuell.de/',
    badgeSrc: '/images/tech-webseiten-check.png',
  },
];

export const QualityBadges: React.FC = () => {
  return (
    <div className="mt-6 flex flex-row items-center justify-center gap-x-12 p-2">
      {badges.map(({ href, badgeSrc }, key) => {
        return (
          <a key={key} href={href} target={'_blank'} rel="noreferrer noopener">
            <Image
              src={badgeSrc}
              width={100}
              height={100}
              alt="Webseiten-Siegel"
              className="object-contain"
            />
          </a>
        );
      })}
    </div>
  );
};
