import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { InfoCircle } from '@styled-icons/bootstrap';
import { NavigateNext } from '@styled-icons/material-rounded';

import { devices } from '../../../config/breakpoints.config';
import { Country, PostalCodeDetails } from '../../../config/countries.config';
import {
  ContactFieldLabelMap,
  ContactFields,
  ContactFieldValidations,
} from '../../../components/Form/Form.config';

import { Button } from '../../../components/Button/Button';
import { Field } from '../../../components/Form';
import { StyledStepTitle } from './StepTitle';
import { CodeInput } from './CodeInput';
import { useQuestionnaireContext } from '../context/Questionnaire';
import { getCountryDetails } from '../../../utils/getCountryDetails';
import { getPostalCodeLength } from '../../../utils/getPostalCodeLength';
import { normalizeHostname } from '../../../utils/normalizeHostname';
import { NextAPI } from '../../../lib/next/api';

const StyledPostalCode = styled.div`
  max-width: 45rem;
  margin: 0 auto;

  .location-input {
    max-width: 25rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media screen and (${devices.md}) {
      max-width: unset;
      flex-direction: row;
      align-items: center;
      column-gap: 2rem;
    }

    .city-input {
      flex-grow: 1;
      width: 100%;
      margin-top: 1.5rem;

      button {
        height: 3.5rem;
      }

      @media screen and (${devices.md}) {
        max-width: 20rem;
        margin-top: 0;
      }

      @media screen and (${devices.lg}) {
        max-width: 22.5rem;
      }
    }
  }

  .button {
    width: 100%;
    max-width: 25rem;
    margin: 0 auto;

    span.error {
      display: block;
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
      color: red;
      opacity: 0.75;
    }

    .hint {
      display: flex;
      margin: 1rem 0 2rem 0;
      font-size: 0.9rem;
      line-height: 1.25rem;

      @media screen and (${devices.sm}) {
        margin: 1rem 0 4rem 0;
      }

      svg {
        flex-shrink: 0;
      }

      span {
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
  }
`;

/**
 * Possible cases:
 * 1. We have no country at all -> Select City (no)   Input Type (Regular Text)
 * 2. We have a single country  -> Select City (yes)  Input Type (Code Input)
 * 3. We have several countries -> Select City (yes)  Input Type (Regular Text)
 */

export const PostalCode: React.FunctionComponent<{
  countries?: Country[];
}> = ({ countries }) => {
  const theme = useTheme();

  // Extract global state from context
  const { state, dispatch } = useQuestionnaireContext();
  const code = state.contact.postalCode ?? '';

  // Create local state to store information about list of matched cities
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<PostalCodeDetails[]>([]);

  // Get country information to decide which layout should be rendered
  const countryDetails = getCountryDetails(countries);
  const postalCodeLength = getPostalCodeLength(countryDetails);

  const isCodeCompleted = !!postalCodeLength && postalCodeLength <= code.length;
  const isSingleCountryContext = !!postalCodeLength && countries?.length === 1;
  const isMultiCountryContext = !!countries && countries.length > 1;

  const isTypingCode = !isCodeCompleted && !cities.length;
  const isRemovingCode = !isCodeCompleted && cities.length;
  const isSameCode = cities?.[0] && cities[0].zipcode === code;
  const showCitySelect = isSingleCountryContext || isMultiCountryContext;

  const updateCity = useCallback(
    (value: string | undefined) => {
      dispatch({
        type: 'setDetails',
        payload: { field: ContactFields.City, value },
      });
    },
    [dispatch],
  );

  const resetCities = useCallback(() => {
    updateCity(undefined);
    setCities([]);
  }, [updateCity]);

  const updatePostalCode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'setDetails',
        payload: { field: ContactFields.PostalCode, value: event.target.value },
      });
    },
    [dispatch],
  );

  useEffect(() => {
    if (!showCitySelect || isTypingCode || isSameCode) return;
    if (isRemovingCode) return resetCities();

    const domain = normalizeHostname(window.location.host);
    if (!domain) return;

    const fetchAndUpdateCities = async () => {
      try {
        setIsLoading(true);
        const res = await (
          await NextAPI.getPostalCodeDetails({
            domain,
            code,
            countries,
          })
        ).json();

        if (!res.success)
          throw new Error('Error while fetching postal code details.');

        const cities = res.data as PostalCodeDetails[];
        if (!cities.length)
          throw new Error('No cities found for postal code' + code);

        setCities(cities);
        setError(undefined);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        resetCities();
        setError(ContactFieldValidations[ContactFields.PostalCode][0].message);
      }
    };

    fetchAndUpdateCities();
  }, [
    isRemovingCode,
    isTypingCode,
    isCodeCompleted,
    isSameCode,
    showCitySelect,
    code,
    countries,
    resetCities,
  ]);

  return (
    <StyledPostalCode>
      <StyledStepTitle className="title">
        Wunderbar!
        <br /> Nennen Sie uns jetzt bitte Ihre Postleitzahl:
      </StyledStepTitle>
      <div className="location-input">
        {isSingleCountryContext ? (
          <>
            <CodeInput
              field={ContactFields.PostalCode}
              type="numeric"
              label={ContactFieldLabelMap[ContactFields.PostalCode]}
              length={postalCodeLength}
              error={error}
            />
          </>
        ) : (
          <Field
            id={ContactFields.PostalCode}
            type="text"
            value={state.contact.postalCode}
            label={ContactFieldLabelMap[ContactFields.PostalCode]}
            validators={ContactFieldValidations[ContactFields.PostalCode]}
            onChange={updatePostalCode}
            inputProps={{
              pattern: '[0-9]*',
            }}
          />
        )}
        {isSingleCountryContext || isMultiCountryContext ? (
          <Field
            type="select"
            className="city-input"
            id={ContactFields.City}
            value={state.contact.city}
            label={ContactFieldLabelMap[ContactFields.City]}
            options={cities.map((city) => city.place)}
            onChange={updateCity}
            buttonProps={{
              disabled: !isCodeCompleted || !!error,
              loading: isLoading,
            }}
          />
        ) : undefined}
      </div>
      <div className="button">
        {error && <span className="error">{error}</span>}
        <div className="hint">
          <InfoCircle
            color={theme.colors.secondary}
            width={16}
            height={16}
            fontWeight={700}
          />
          <span>Für die Suche nach dem idealen Anbieter in Ihrer Region</span>
        </div>
        <Button
          label="Weiter"
          disabled={
            (!!countries && !isCodeCompleted) ||
            (!!!countries && code.trim().length < 4) ||
            isLoading ||
            !!error
          }
          onClickHandler={() => {
            dispatch({ type: 'setIndex', payload: { index: state.index + 1 } });
          }}
          icon={
            <NavigateNext
              width={24}
              height={24}
              style={{ marginBottom: '3px' }}
            />
          }
          fullWidth
        />
      </div>
    </StyledPostalCode>
  );
};
