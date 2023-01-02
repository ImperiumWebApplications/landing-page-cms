import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Country, PostalCodeDetails } from '../../../config/countries.config';

import { useQuestionnaireContext } from '../context/Questionnaire';
import { getCountryDetails } from '../../../utils/getCountryDetails';
import { getPostalCodeLength } from '../../../utils/getPostalCodeLength';
import { normalizeHostname } from '../../../utils/normalizeHostname';
import { NextAPI } from '../../../lib/next/api';

import { Button } from '../../../components/Button';
import { ContactFieldConfig, Field } from '../../../components/Form';
import { ChevronRightIcon, InfoCircleIcon } from '../../../components/Icons';
import { StepTitle } from './StepTitle';

/**
 * Possible cases:
 * 1. We have no country at all -> Select City (no)   Input Type (Regular Text)
 * 2. We have a single country  -> Select City (yes)  Input Type (Code Input)
 * 3. We have several countries -> Select City (yes)  Input Type (Regular Text)
 */

export const PostalCode: React.FC<{
  countries?: Country[];
}> = ({ countries }) => {
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
        payload: { values: { ...state.contact, city: value } },
      });
    },
    [dispatch, state.contact],
  );

  const resetCities = useCallback(() => {
    updateCity(undefined);
    setCities([]);
  }, [updateCity]);

  const updatePostalCode = useCallback(
    (update: ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof update === 'string' ? update : update.target.value;
      dispatch({
        type: 'setDetails',
        payload: { values: { ...state.contact, postalCode: value } },
      });
    },
    [dispatch, state.contact],
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
        setError(ContactFieldConfig.PostalCode.validators[0].message);
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
    <div className="mx-auto px-0 md:px-8 lg:max-w-3xl lg:px-0">
      <StepTitle>
        Wunderbar!
        <br /> Nennen Sie uns jetzt bitte Ihre Postleitzahl:
      </StepTitle>
      <div className="mx-auto flex max-w-sm flex-col items-start justify-center lg:max-w-none lg:flex-row lg:items-center lg:gap-x-8">
        {isSingleCountryContext ? (
          <>
            <Field
              type="code"
              id={ContactFieldConfig.PostalCode.name}
              label={ContactFieldConfig.PostalCode.label}
              value={state.contact.postalCode}
              onChange={updatePostalCode}
              length={postalCodeLength}
              inputProps={{
                className: error ? 'border-[red]' : '',
              }}
            />
          </>
        ) : (
          <Field
            id={ContactFieldConfig.PostalCode.name}
            type="text"
            validators={ContactFieldConfig.PostalCode.validators}
            label={ContactFieldConfig.PostalCode.label}
            value={state.contact.postalCode}
            onChange={updatePostalCode}
            inputProps={{
              pattern: '[0-9]*',
            }}
          />
        )}
        {isSingleCountryContext || isMultiCountryContext ? (
          <Field
            type="select"
            className="mt-6 w-full flex-grow lg:mt-0 lg:max-w-sm"
            id={ContactFieldConfig.City.name}
            value={state.contact.city}
            label={ContactFieldConfig.City.label}
            options={cities.map((city) => city.place)}
            onChange={updateCity}
            buttonProps={{
              disabled: !isCodeCompleted || !!error,
              loading: isLoading,
            }}
          />
        ) : undefined}
      </div>
      <div className="mx-auto w-full max-w-sm">
        {error && (
          <span className="mt-4 block text-center text-sm text-[red] opacity-75">
            {error}
          </span>
        )}
        <div className="mx-0 mt-4 mb-8 flex text-sm sm:mb-8">
          <InfoCircleIcon className="h-4 w-4 fill-secondary font-bold" />
          <span className="ml-2 inline-block">
            Für die Suche nach dem idealen Anbieter in Ihrer Region
          </span>
        </div>
        <Button
          variant="primary"
          size="fullWidth"
          label="Weiter"
          className="font-semibold uppercase tracking-wider"
          Icon={<ChevronRightIcon width={24} height={24} />}
          disabled={
            (!!countries && !isCodeCompleted) ||
            (!!!countries && code.trim().length < 4) ||
            isLoading ||
            !!error
          }
          onClick={() => {
            dispatch({ type: 'setIndex', payload: { index: state.index + 1 } });
          }}
        />
      </div>
    </div>
  );
};
