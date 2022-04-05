import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import hexRgb from 'hex-rgb';
import { ReactSVG } from 'react-svg';
import { ArrowRightShort } from '@styled-icons/bootstrap';

import type { ConnectedQuestionnaire } from '../backend-api';
import { questionnaireRoute } from '../config/navigation.config';
import { devices } from '../config/breakpoints.config';
import { slugifyRoute } from '../utils/slugifyRoute';
import { isSvg } from '../utils/isSvg';

const StyledQuestionnaireTile = styled.a`
  position: relative;
  overflow: hidden;

  width: 8.5rem;
  max-width: 33rem;
  padding: 1rem 1rem 2.5rem 1rem;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto;

  background-color: #f8f8f8;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.3s ease-in-out;
  border: 2px dashed
    ${({ theme }) => hexRgb(theme.colors.text, { format: 'css', alpha: 0.1 })};

  @media screen and (${devices.sm}) {
    padding: 2rem 1rem;
    width: 12rem;
  }

  @media screen and (${devices.lg}) {
    flex: 1;
  }

  @media screen and (${devices.xl}) {
    max-width: 22rem;
  }

  // https://css-tricks.com/annoying-mobile-double-tap-link-issue/
  @media (hover) {
    &:hover {
      transform: translate3d(0px, -1px, 0px);
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.tertiary},
        0 0 0 3px ${({ theme }) => theme.colors.primary};

      &:before {
        transform: scale(21);
      }
    }
  }

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: -1.5rem;
    right: -1.5rem;
    background: ${({ theme }) => theme.colors.tertiary};
    height: 3rem;
    width: 3rem;
    border-radius: 3rem;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  .icon {
    height: 2rem;
    width: auto;
    margin-bottom: 1rem;

    @media screen and (${devices.sm}) {
      height: 2.5rem;
    }

    svg {
      height: 2rem;
      width: 2rem;

      @media screen and (${devices.sm}) {
        height: 2.5rem;
        width: 2.5rem;
      }
    }

    svg,
    svg path {
      fill: ${({ theme }) => theme.colors.secondary} !important;
    }

    @media screen and (${devices.lg}) {
      height: 3rem;
      width: auto;

      svg {
        height: 3rem;
        width: auto;
      }
    }
  }

  /** Loading blob, displayed while SVGs are fetched */
  .loading {
    height: 2.5rem;
    width: 2.5rem;
    filter: brightness(90%);
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    background-color: ${({ theme }) => theme.colors.tertiary};
    opacity: 0.25;
  }

  .description {
    h2 {
      font-size: 1rem;
      line-height: 1.25rem;

      @media screen and (${devices.sm}) {
        font-size: 1.25rem;
        line-height: 1.5rem;
      }

      @media screen and (${devices.lg}) {
        font-size: 1.5rem;
        line-height: 1.75rem;
      }
    }
    p {
      display: none;
      @media screen and (${devices.lg}) {
        display: block;
        margin-top: 1rem;
      }
    }
  }

  span.show-more {
    display: none;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    margin-top: 2rem;
    text-transform: uppercase;
    letter-spacing: +0.5px;

    @media screen and (${devices.lg}) {
      display: block;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    bottom: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.tertiary};
    border-radius: 3rem 4px 0 0;

    @media screen and (${devices.lg}) {
      width: 3rem;
      height: 3rem;
    }

    > div {
      margin-left: 8px;
      margin-top: 8px;
    }

    svg {
      fill: ${({ theme }) => theme.colors.text};
      width: 1.5rem;

      @media screen and (${devices.lg}) {
        width: 1.875rem;
      }
    }
  }
`;

export const QuestionnaireTile: React.FunctionComponent<{
  questionnaire: { id: number; attributes: ConnectedQuestionnaire };
}> = ({ questionnaire }) => {
  const { id, attributes } = questionnaire;
  if (!attributes.name) return <></>;

  const slug = slugifyRoute(attributes.name);
  const route = `/${questionnaireRoute}/${slug}-${id}`;

  const isSvgIcon = isSvg(attributes.icon?.data?.attributes.ext);

  return (
    <Link href={route} passHref>
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
        <div className="arrow">
          <div>
            <ArrowRightShort width={30} />
          </div>
        </div>
      </StyledQuestionnaireTile>
    </Link>
  );
};
