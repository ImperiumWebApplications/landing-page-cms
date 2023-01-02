import Image from 'next/image';
import { useThemeColor } from '../../../hooks/useThemeColor';

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
  const tertiaryHex = useThemeColor('tertiary');

  return (
    <div
      className="-mb-8 flex flex-row items-center justify-center gap-x-12 p-2 md:-mb-24"
      style={{
        backgroundImage: `linear-gradient(to right, ${tertiaryHex}00, ${tertiaryHex}, ${tertiaryHex}00)`,
      }}
    >
      {badges.map(({ href, badgeSrc }, key) => {
        return (
          <a key={key} href={href} target={'_blank'} rel="noreferrer noopener">
            <Image
              src={badgeSrc}
              width={120}
              height={120}
              alt="Webseiten-Siegel"
              className="object-contain"
            />
          </a>
        );
      })}
    </div>
  );
};
