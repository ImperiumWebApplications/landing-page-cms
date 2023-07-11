import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import Downshift from 'downshift';
import { useQuestionnaireContext } from '../context/Questionnaire';
import { NextAPI } from '../../../lib/next/api/client';
import { Button } from '../../../components/Button';
import type { StaticContent } from '../../../lib/strapi/model';
import { i18n } from '../../../config/i18n.config';
import { useLanguageContext } from '../../../context/Language';
import { StepTitle } from './StepTitle';

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
  const storedState = localStorage.getItem('selectedState');
  const parsedState = storedState ? JSON.parse(storedState) : '';
  const [selectedState, setSelectedState] = useState<string | undefined>(
    parsedState,
  );
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
  return (
    <div className="mx-auto px-0 md:px-8 lg:max-w-xl lg:px-0 ">
      <StepTitle>{staticContent?.postal_code_step_title}</StepTitle>
      <Downshift
        onChange={updateCity}
        itemToString={(item) => (item ? item.toUpperCase() : '')}
        initialInputValue={selectedState}
        initialSelectedItem={selectedState}
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
                gap: '10px',
              }}
            >
              <input
                {...getInputProps()}
                placeholder={i18n[language].QUESTIONNAIRE_SELECT}
                className="h-[52px] w-full rounded-md border-2 border-[black]/10 bg-[white] py-2 pr-12 pl-4 text-left align-middle brightness-95"
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
                              highlightedIndex === index
                                ? 'lightgray'
                                : 'white',
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
    </div>
  );
};
