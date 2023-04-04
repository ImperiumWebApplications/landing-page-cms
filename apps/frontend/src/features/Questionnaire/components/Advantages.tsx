import { CheckCircleIcon } from '../../../components/Icons';

type AdvantagesProps = {
  items?: string[];
};

export const Advantages: React.FC<AdvantagesProps> = (props) => {
  return (
    <div className="flex flex-col justify-center gap-4 bg-[black]/5 py-6 px-4 md:flex-row md:items-center md:gap-32 md:px-0">
      {props.items?.map((item, i) => {
        return (
          <div
            key={i}
            data-testid="questionnaire-advantage"
            className="flex max-w-xs items-center text-sm md:justify-center"
          >
            <CheckCircleIcon className="h-8 w-8 shrink-0 fill-[#4BB982]" />
            <span
              className="ml-4 block"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </div>
        );
      })}
    </div>
  );
};
