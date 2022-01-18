import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

import type { ConnectedQuestionnaire } from '../backend-api';
import { questionnaireRoute } from '../config/navigation.config';
import { devices } from '../config/breakpoints.config';
import { slugifyRoute } from '../utils/slugifyRoute';

const StyledQuestionnaireTile = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;
  padding: 2rem 1rem;
  width: 6.5rem;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 0.3s ease-in-out;

  @media screen and (${devices.sm}) {
    width: 7.5rem;
  }

  @media screen and (${devices.md}) {
    width: 10rem;
    height: 80%;
  }

  @media screen and (${devices.lg}) {
    width: 12rem;
  }

  @media screen and (${devices.xl}) {
    width: 13.5rem;
  }

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

  .description {
    h2 {
      font-size: 1rem;
      line-height: 1.25rem;
      margin-bottom: 1rem;

      @media screen and (${devices.sm}) {
        font-size: 1.25rem;
        line-height: 1.5rem;
      }

      @media screen and (${devices.md}) {
        font-size: 1.5rem;
        line-height: 1.75rem;
      }
    }
    p {
      display: none;
      @media screen and (${devices.lg}) {
        display: block;
      }
    }
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
  questionnaire: { id: number; attributes: ConnectedQuestionnaire };
}> = ({ questionnaire }) => {
  const { id, attributes } = questionnaire;
  if (!attributes.name) return <></>;

  const slug = slugifyRoute(attributes.name);
  const route = `/${questionnaireRoute}/${slug}-${id}`;

  const isSvgIcon = attributes.icon?.data?.attributes.ext.includes('svg');

  return (
    <Link href={route} passHref>
      <a>
        <StyledQuestionnaireTile>
          <div className="icon">
            {attributes.icon?.data && !isSvgIcon && (
              <Image
                src={attributes.icon.data.attributes.url}
                alt={attributes.icon.data.attributes.alternativeText}
                width={attributes.icon.data.attributes.width}
                height={attributes.icon.data.attributes.height}
              />
            )}
            {attributes.icon && isSvgIcon && (
              <ReactSVG
                loading={() => <div className="loading" />}
                src={attributes.icon.data.attributes.url}
              />
            )}
          </div>
          <div className="description">
            <h2>{attributes.name}</h2>
            <p>{attributes.description}</p>
          </div>
          <span className="show-more">Siehe Mehr</span>
        </StyledQuestionnaireTile>
      </a>
    </Link>
  );
};
