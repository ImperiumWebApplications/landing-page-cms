import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useQuestionnaireContext } from '../context/Questionnaire';
import { NextAPI } from '../../../lib/next/api/client';
import { Button } from '../../../components/Button';
import type { StaticContent } from '../../../lib/strapi/model';
import { i18n } from '../../../config/i18n.config';
import { useLanguageContext } from '../../../context/Language';
import { StepTitle } from './StepTitle';
interface StateSelectorProps {
  countries?: string[] | null;
  staticContent?: StaticContent['questionnaire'];
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  countries,
  staticContent,
}) => {
  const { language } = useLanguageContext();
  const storedState = localStorage.getItem('selectedState');
  const parsedState = storedState ? JSON.parse(storedState) : '';
  const [selectedState, setSelectedState] = useState<string | undefined>(
    parsedState,
  );
  const [states, setStates] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { state, dispatch } = useQuestionnaireContext();

  const updateCity = (selectedItem: string | null | undefined) => {
    if (selectedItem) {
      dispatch({
        type: 'setDetails',
        payload: {
          values: { ...state.contact, postalCode: ' ', city: selectedItem },
        },
      });
      setSelectedState(selectedItem);
      localStorage.setItem('selectedState', JSON.stringify(selectedItem));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await NextAPI.getRegionSuggestions({
          countries: countries,
          region: inputValue,
        });
        const data = await res.json();
        const options = data.suggest.regions_suggestor[0].options.map(
          (option: any) => {
            return {
              value: option.text,
              label: option.text,
            };
          },
        );
        setStates(options);
      } catch (error) {
        console.error('Error while fetching region suggestions:', error);
      }
    };

    const debounceFetchData = setTimeout(() => {
      if (inputValue) {
        fetchData();
      }
    }, 300);

    return () => {
      clearTimeout(debounceFetchData);
    };
  }, [inputValue]);

  const handleChange = (selectedOption: any) => {
    updateCity(selectedOption.value);
  };

  const menuStyles = {
    menu: (base: any) => ({
      ...base,
      visibility: inputValue.length > 0 ? 'visible' : 'hidden',
    }),
  };

  return (
    <div className="mx-auto px-0 md:px-8 lg:max-w-xl lg:px-0 ">
      <StepTitle>{i18n[language].STATE_AUTOCOMPLETE_TITLE}</StepTitle>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Select
          autoFocus
          options={states}
          onChange={handleChange}
          onInputChange={(value) => setInputValue(value)}
          placeholder={i18n[language].STATE_AUTOCOMPLETE_INPUT_PLACEHOLDER}
          className=" w-full rounded-md brightness-95"
          styles={menuStyles}
        />
        <Button
          label={staticContent?.postal_code_button_label ?? i18n[language].NEXT}
          data-testid="questionnaire-state-selector-button"
          disabled={!selectedState || selectedState.length === 0}
          onClick={() => {
            dispatch({
              type: 'setIndex',
              payload: { index: state.index + 1 },
            });
          }}
        />
      </div>
    </div>
  );
};
