import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import Downshift from 'downshift';
import { useQuestionnaireContext } from '../context/Questionnaire';
import { NextAPI } from '../../../lib/next/api/client';
import { Button } from '../../../components/Button';
import type { StaticContent } from '../../../lib/strapi/model';
import { i18n } from '../../../config/i18n.config';
import { useLanguageContext } from '../../../context/Language';

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

export const StateSelector: React.FC<StateSelectorProps> = ({
  countries,
  staticContent,
}) => {
  const { language } = useLanguageContext();
  const [selectedState, setSelectedState] = useState<string | undefined>('');
  const [states, setStates] = useState<string[]>([]);
  const { state, dispatch } = useQuestionnaireContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryName = COUNTRY_CODES[countries![0]];
        const res = await NextAPI.getStatesNames({ country: countryName });
        const data = await res.json();
        setStates(data);
      } catch (error) {
        console.error('Error while fetching state names:', error);
      } finally {
      }
    };

    if (countries && countries.length > 0) {
      fetchData();
    }
  }, [countries]);

  const updateCity = (selectedItem: string | null | undefined) => {
    if (selectedItem) {
      console.log(
        'Calling updateCity from stateselector and value is',
        selectedItem,
      );
      dispatch({
        type: 'setDetails',
        payload: {
          values: { ...state.contact, postalCode: ' ', city: selectedItem },
        },
      });
      setSelectedState(selectedItem);
    }
  };

  return (
    <Downshift
      onChange={updateCity}
      itemToString={(item) => (item ? item.toUpperCase() : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => {
        const filteredStates = inputValue
          ? states.filter((item) =>
              item.toLowerCase().includes(inputValue.toLowerCase()),
            )
          : states;

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <input
              {...getInputProps()}
              placeholder={i18n[language].QUESTIONNAIRE_SELECT}
              style={{
                height: '35px',
                width: '50%',
                padding: '5px',
                border: '1px solid black',
              }}
            />
            {isOpen && (
              <div style={{ width: '50%', height: 280 }}>
                <List
                  height={height * 8}
                  itemCount={filteredStates.length}
                  itemSize={height}
                  {...getMenuProps()}
                >
                  {({ index, style }) => {
                    const state = filteredStates[index];
                    return (
                      <div
                        {...getItemProps({ index, item: state, style })}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight:
                            selectedItem === state ? 'bold' : 'normal',
                          ...style,
                        }}
                      >
                        {state.toUpperCase()}
                      </div>
                    );
                  }}
                </List>
              </div>
            )}
            <Button
              label={
                staticContent?.postal_code_button_label ?? i18n[language].NEXT
              }
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
        );
      }}
    </Downshift>
  );
};
