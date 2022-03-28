import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { Rating } from '../backend-api';
import { devices } from '../config/breakpoints.config';
import { useMediaQuery } from '../hooks/useMediaQuery';

const StyledReview = styled.div`
  position: relative;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 6px;
  padding: 5rem 3rem 2rem 3rem;
  margin: 3.5rem 0.5rem 2rem 0.5rem;

  @media screen and (${devices.sm}) {
    padding: 5rem 2rem 2rem 2rem;
    margin: 3.5rem 2rem 2rem 2rem;
  }

  @media screen and (${devices.md}) {
    padding: 6rem 5rem 4rem 5rem;
  }

  .description {
    line-height: 1.75rem;
    margin-bottom: 2rem;

    .show-more {
      opacity: 0.75;
      font-weight: 700;
    }
  }

  .avatar {
    position: absolute;
    z-index: 2;
    top: -50px;
    left: calc(50% - 50px);
    height: 100px;
    width: 100px;

    &::before {
      content: '';
      position: absolute;
      width: 110px;
      height: 55px;
      left: -5px;
      top: -5px;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      background-color: ${({ theme }) => theme.colors.primary};
    }

    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 110px;
      height: 55px;
      left: -5px;
      bottom: 0px;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      background-color: ${({ theme }) => theme.colors.tertiary};
    }
  }
`;

export const Review: React.FunctionComponent<{
  content: Rating;
}> = ({ content }) => {
  const isTabletBreakpoint = useMediaQuery(`(${devices.sm})`);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <StyledReview>
      <div className="avatar">
        {content.avatar?.data?.attributes && (
          <Image
            src={content.avatar.data.attributes.url}
            alt={content.avatar.data.attributes.alternativeText}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      {content.description && (
        <p className="description">
          {isTabletBreakpoint || isExpanded
            ? content.description
            : `${content.description?.substring(0, 300)}...`}
          {!isTabletBreakpoint && (
            <span
              className="show-more"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? ' Weniger anzeigen' : ' Mehr anzeigen'}
            </span>
          )}
        </p>
      )}
      <h3 className="name" aria-label="Name">
        {content.name}
      </h3>
      <span className="biography">{content.biography}</span>
    </StyledReview>
  );
};
