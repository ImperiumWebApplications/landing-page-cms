import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import { ReactSVG } from 'react-svg';

import { ConnectedQuestionnaire } from '../backend-api';
import { questionnaireRoute } from '../config/navigation.config';

const StyledQuestionnaireTile = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  padding: 2rem 1rem;
  width: 13.5rem;
  height: 80%;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
    transform: translate3d(0px, -4px, 0px);

    .icon {
      svg,
      svg path {
        fill: ${({ theme }) => theme.colors.tertiary} !important;
      }
    }
  }

  .icon {
    height: 3rem;
    width: auto;
    margin-bottom: 1rem;

    svg,
    svg path {
      fill: ${({ theme }) => theme.colors.secondary} !important;
    }
  }

  /** Loading blob, displayed while SVGs are fetched */
  .loading {
    height: 3rem;
    width: 3rem;
    filter: brightness(90%);
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    background-color: ${({ theme }) => theme.colors.tertiary};
    opacity: 0.25;
  }

  .description h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  span.show-more {
    display: block;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    margin-top: 2rem;
    text-transform: uppercase;
    letter-spacing: +0.5px;
  }
`;

export const QuestionnaireTile: React.FunctionComponent<{
  questionnaire: ConnectedQuestionnaire;
}> = ({ questionnaire }) => {
  const slug = slugify(questionnaire.name).toLowerCase();
  const route = `/${questionnaireRoute}/${slug}`;

  const isSvgIcon = questionnaire.icon?.data?.attributes.ext.includes('svg');

  return (
    <Link href={route} passHref>
      <a>
        <StyledQuestionnaireTile>
          <div className="icon">
            {questionnaire.icon?.data && !isSvgIcon && (
              <Image
                src={questionnaire.icon.data.attributes.url}
                alt={questionnaire.icon.data.attributes.alternativeText}
                width={questionnaire.icon.data.attributes.width}
                height={questionnaire.icon.data.attributes.height}
              />
            )}
            {questionnaire.icon && isSvgIcon && (
              <ReactSVG
                loading={() => <div className="loading" />}
                src={questionnaire.icon.data.attributes.url}
              />
            )}
          </div>
          <div className="description">
            <h2>{questionnaire.name}</h2>
            <p>{questionnaire.description}</p>
          </div>
          <span className="show-more">Siehe Mehr</span>
        </StyledQuestionnaireTile>
      </a>
    </Link>
  );
};
