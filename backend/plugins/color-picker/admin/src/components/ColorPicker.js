import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';

const Title = styled.h5`
  margin-bottom: 1.5rem;
  color: #333740;
`;

const ColorWindow = styled.div`
  background-color: ${(props) => props.color};
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 1px solid #476582;
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 2;
  top: 70px;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const ColorPicker = ({ name, label, value, onChange }) => {
  const [showPicker, setShowPicker] = React.useState(false);
  const color = value || '#FFFFFF';

  const updateColorValue = (colorValue) => {
    onChange({ target: { name: name, value: colorValue } });
  };

  const handleChangeComplete = (color) => {
    updateColorValue(color.hex);
  };

  return (
    <div>
      <Title>{label}</Title>
      <ColorWindow color={color} onClick={() => setShowPicker(true)} />
      {showPicker ? (
        <PopOver>
          <Cover onClick={() => setShowPicker(false)} />
          <ChromePicker color={color} onChange={handleChangeComplete} />
        </PopOver>
      ) : null}
    </div>
  );
};

ColorPicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
