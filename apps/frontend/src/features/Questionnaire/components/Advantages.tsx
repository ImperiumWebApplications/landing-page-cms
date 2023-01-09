import type { LandingPage } from '../../../lib/strapi';

import { CheckCircleIcon } from '../../../components/Icons';
import { useThemeColor } from '../../../hooks/useThemeColor';

export const Advantages: React.FC<{
  content?: NonNullable<LandingPage['questionnaire']>['advantage'];
}> = ({ content }) => {
  const primaryHex = useThemeColor('primary');

  return (
    <div
      id="advantages"
      className="rounded-bl-[20px] rounded-br-[20px]"
      style={{ backgroundColor: `${primaryHex}1A` }}
    >
      <div className="content-wrapper flex flex-col items-start justify-between gap-y-4 py-4 pl-4 pr-4 md:flex-row md:items-center md:gap-x-12 md:gap-y-0 md:py-8 md:pl-24 md:pr-24">
        {content?.length
          ? content.map((advantage, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-row items-center justify-start gap-x-4"
                >
                  <CheckCircleIcon className="h-12 w-12 text-primary" />
                  <div className="leading-6">
                    <span className="block font-semibold">
                      {advantage.first_line}
                    </span>
                    {advantage.second_line}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
