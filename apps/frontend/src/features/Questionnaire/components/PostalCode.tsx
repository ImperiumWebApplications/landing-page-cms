import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import type { StaticContent } from '../../../lib/strapi/model';
import { PostalCodeDetails } from '../../../config/countries.config';
import { i18n } from '../../../config/i18n.config';

import { useQuestionnaireContext } from '../context/Questionnaire';
import { useLanguageContext } from '../../../context/Language';
import { getCountryDetails } from '../../../utils/getCountryDetails';
import { getPostalCodeLength } from '../../../utils/getPostalCodeLength';
import { normalizeHostname } from '../../../utils/normalizeHostname';
import { NextAPI } from '../../../lib/next/api/client';

import { Button } from '../../../components/Button';
import { ContactFieldConfig, Field } from '../../../components/Form';
import { InfoCircleIcon } from '../../../components/Icons';
import { StepTitle } from './StepTitle';

/**
 * Possible cases:
 * 1. We have no country at all -> Select City (no)   Input Type (Regular Text)
 * 2. We have a single country  -> Select City (yes)  Input Type (Code Input)
 * 3. We have several countries -> Select City (no)  Input Type (Regular Text)
 */

type PostalCodeProps = {
  countries?: string[] | null;
  staticContent?: StaticContent['questionnaire'];
};

export const PostalCode: React.FC<PostalCodeProps> = ({
  countries,
  staticContent,
}) => {
  const { language } = useLanguageContext();
  const PostalCodeField = ContactFieldConfig.PostalCode.getConfig(language);
  const CityField = ContactFieldConfig.City.getConfig(language);

  // Extract global state from context
  const { state, dispatch } = useQuestionnaireContext();
  const code = state.contact.postalCode ?? '';

  // Create local state to store information about list of matched cities
  const [error, setError] = useState<string | undefined>(undefined);
  const [failedCode, setFailedCode] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<PostalCodeDetails[]>([]);

  // Get country information to decide which layout should be rendered
  const countryDetails = getCountryDetails(countries);
  const postalCodeLength = getPostalCodeLength(countryDetails);

  const isCodeCompleted = !!postalCodeLength && postalCodeLength <= code.length;
  const isSingleCountryContext = !!postalCodeLength && countries?.length === 1;
  // const isMultiCountryContext = !!countries && countries.length > 1;

  const isTypingCode = !isCodeCompleted && !cities.length;
  const isRemovingCode = !isCodeCompleted && cities.length;
  const showCitySelect = isSingleCountryContext;
  const isSameSelectedCode = cities?.[0] && cities[0].code === code;
  const isSameFailedCode = failedCode === code;

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

  const isRegularTextFieldInputValid = useCallback(
    (code?: string) => {
      if (!code || code.trim().length < 4) return false;
      return PostalCodeField.validators.some((validator) =>
        validator.regex.test(code ?? ''),
      );
    },
    [PostalCodeField.validators],
  );

  useEffect(() => {
    // Avoid unnecessary requests if the code has not changed
    if (isSameSelectedCode || isSameFailedCode) return;
    if (!showCitySelect || isTypingCode) return;
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
        setFailedCode(code);
        setError(PostalCodeField.validators[0].message);
      }
    };

    fetchAndUpdateCities();
  }, [
    isRemovingCode,
    isTypingCode,
    isCodeCompleted,
    isSameFailedCode,
    isSameSelectedCode,
    showCitySelect,
    code,
    countries,
    resetCities,
  ]);

  return (
    <div className="mx-auto px-0 md:px-8 lg:max-w-xl lg:px-0 ">
      <StepTitle>{staticContent?.postal_code_step_title}</StepTitle>
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center lg:max-w-none lg:flex-row lg:items-center lg:gap-x-4">
        {isSingleCountryContext ? (
          <Field
            type="code"
            id={ContactFieldConfig.PostalCode.id}
            label={PostalCodeField.label}
            value={state.contact.postalCode}
            onChange={updatePostalCode}
            length={postalCodeLength}
            inputProps={{
              className: error ? 'border-[red]' : '',
            }}
          />
        ) : (
          <Field
            id={ContactFieldConfig.PostalCode.id}
            type="text"
            validators={PostalCodeField.validators}
            label={PostalCodeField.label}
            value={state.contact.postalCode}
            onChange={updatePostalCode}
            className="mb-2 w-[300px]"
            inputProps={{
              pattern: '[0-9]*',
            }}
          />
        )}
        {isSingleCountryContext ? (
          <Field
            type="select"
            className="mt-6 w-full flex-grow lg:mt-0 lg:max-w-xs"
            id={ContactFieldConfig.City.id}
            value={state.contact.city}
            label={CityField.label}
            options={cities.map((city) => city.place)}
            onChange={updateCity}
            buttonProps={{
              disabled: !isCodeCompleted || !!error,
              loading: isLoading,
            }}
          />
        ) : undefined}
      </div>
      <div className="mx-auto w-full max-w-md">
        {error && (
          <span className="mt-4 block text-center text-sm text-[red] opacity-75">
            {error}
          </span>
        )}
        {staticContent?.postal_code_explanation ? (
          <div className="mx-0 mt-4 mb-8 flex items-center text-sm sm:mb-8">
            <InfoCircleIcon className="hidden h-4 w-4 fill-gray font-bold md:block" />
            <span className="inline-block md:ml-2">
              {staticContent?.postal_code_explanation}
            </span>
          </div>
        ) : null}
        <div className="text-center">
          <Button
            label={
              staticContent?.postal_code_button_label ?? i18n[language].NEXT
            }
            data-testid="questionnaire-postal-code-button"
            disabled={
              (!!countries && !isCodeCompleted) ||
              (!!!countries &&
                !isRegularTextFieldInputValid(state.contact.postalCode)) ||
              isLoading ||
              !!error
            }
            onClick={() => {
              dispatch({
                type: 'setIndex',
                payload: { index: state.index + 1 },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

