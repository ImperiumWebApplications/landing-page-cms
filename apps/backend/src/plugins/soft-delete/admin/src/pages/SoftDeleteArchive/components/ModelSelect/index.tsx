import React from 'react';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { Box, Typography } from '@strapi/design-system';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 10px 0 20px;
  .radio-group-root {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .radio-group-item {
    padding: 8px 14px;
    background: ${({ theme }) => theme.colors.neutral0};
    border-radius: 4px;
    transition: background 0.2s ease-in-out;

    &[data-state='checked'] {
      background: ${({ theme }) => theme.colors.neutral600};

      .radio-group-label {
        color: ${({ theme }) => theme.colors.neutral0};
      }
    }
  }

  .radio-group-indicator {
  }

  .radio-group-label {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutral800};
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
`;

type ModelSelectProps = {
  models?: string[];
  value?: string | null;
  onChange: (model: string) => void;
};

export const ModelSelect: React.FC<ModelSelectProps> = ({
  models,
  value,
  onChange,
}) => {
  if (!models) return null;

  return (
    <Box style={{ padding: '20px 56px', marginTop: '-20px' }}>
      <Typography as="p">Select collection type</Typography>
      <StyledForm>
        <RadioGroup.Root
          className="radio-group-root"
          aria-label="View density"
          value={value ?? undefined}
          onValueChange={onChange}
        >
          {models.map((model) => {
            return (
              <Box
                style={{ display: 'flex', alignItems: 'center' }}
                key={model}
              >
                <RadioGroup.Item
                  className="radio-group-item"
                  value={model}
                  id={model}
                >
                  <RadioGroup.Indicator className="radio-group-indicator" />
                  <Typography
                    as="label"
                    className="radio-group-label"
                    htmlFor={model}
                  >
                    {`${capitalize(model.replace(/-/g, ' '))}s`}
                  </Typography>
                </RadioGroup.Item>
              </Box>
            );
          })}
        </RadioGroup.Root>
      </StyledForm>
    </Box>
  );
};

const capitalize = (str: string) => {
  return str.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
};
