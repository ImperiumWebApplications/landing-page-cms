import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { NextAPI } from '../../../lib/next/api/client';
import { Button } from '../../../components/Button';
import type { StaticContent } from '../../../lib/strapi/model';
import { i18n } from '../../../config/i18n.config';
import { useLanguageContext } from '../../../context/Language';
import { useQuestionnaireContext } from '../context/Questionnaire';

const COUNTRY_CODES: Record<string, string> = {
  US: 'USA',
  CH: 'Switzerland',
  DE: 'Germany',
  AT: 'Austria',
};

interface StateSelectorProps {
  countries?: string[] | null;
  staticContent?: StaticContent['questionnaire'];
}

const height = 35;

const MenuList = (props: any) => {
  const { options, children, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={height * 8}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index }: any) => <div>{children[index]}</div>}
    </List>
  );
};

export const StateSelector: React.FC<StateSelectorProps> = ({
  countries,
  staticContent,
}) => {
  const { language } = useLanguageContext();
  const [selectedState, setSelectedState] = useState<string | undefined>('');
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useQuestionnaireContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const countryName = COUNTRY_CODES[countries![0]];
        const res = await NextAPI.getCityNames({ country: countryName });
        const data = await res.json();
        setStates(data);
      } catch (error) {
        console.error('Error while fetching state names:', error);
      } finally {
        setLoading(false);
      }
    };

    if (countries && countries.length > 0) {
      fetchData();
    }
  }, [countries]);

  const updateCity = (value: string | undefined) => {
    console.log('Calling updateCity from stateselector and value is', value);
    dispatch({
      type: 'setDetails',
      payload: {
        values: { ...state.contact, postalCode: ' ', city: value },
      },
    });
    setSelectedState(value);
  };
  return (
    <div>
      <Select
        className="m-auto w-2/4 py-5"
        id="select-container"
        components={{ MenuList }}
        options={states.map((state) => ({
          value: state,
          label: state.toUpperCase(),
        }))}
        isLoading={loading}
        onChange={(selectedOption) => updateCity(selectedOption?.value ?? '')}
      />
      <div className="text-center">
        <Button
          label={staticContent?.postal_code_button_label ?? i18n[language].NEXT}
          data-testid="questionnaire-state-selector-button"
          disabled={selectedState!.length === 0}
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
