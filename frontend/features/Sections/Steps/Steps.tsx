import { motion } from 'framer-motion';

import { SectionContainer } from '../SectionContainer';
import { useSectionContext } from '../SectionContext';

const STEPS = [
  'Formular ausfüllen und Bedarf festhalten',
  'Kostenlose Angebote von Firmen erhalten',
  'Bestes Preis-Leistungsverhältnis auswählen',
];

type StepsSectionProps = {
  id: string;
};

export const StaticStepsSection: React.FC<StepsSectionProps> = (props) => {
  const { state } = useSectionContext();

  if (state.funnelTarget === 'Appointment') {
    STEPS[0] = STEPS[0]?.replace('Formular ausfüllen', 'Termin vereinbaren');
  }

  return (
    <SectionContainer id={props.id} className="my-12 bg-tertiary">
      <div className="flex flex-col items-center justify-between gap-y-8 py-8 md:flex-row md:gap-x-8">
        {STEPS.length &&
          STEPS.map((step, i) => {
            const delay = 300 + 200 * i;
            const bg = getStepBackgroundColor(i);

            return (
              <motion.div
                key={i}
                className="flex flex-row items-center justify-start text-lg tracking-tight lg:text-xl"
                initial={{ opacity: 0, translateY: 10 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ delay: delay / 1000 }}
                viewport={{ once: true }}
              >
                <div
                  className={`mr-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-blob ${bg} text-center text-4xl font-semibold text-[white] shadow-md lg:h-20 lg:w-20 lg:text-5xl`}
                >
                  {i + 1}
                </div>
                {step}
              </motion.div>
            );
          })}
      </div>
    </SectionContainer>
  );
};

const getStepBackgroundColor = (index: number) => {
  switch (index) {
    case 0:
      return 'bg-primary';
    case 1:
      return 'bg-secondary';
    case 2:
      return 'bg-[#848689]';
  }
};
