import React from 'react';
import './settingBlock.css';

const SettingBlock = ({
  inputValue,
  setInputValue,
  label,
  inputId,
  inputType,
  size,
}) => {
  return (
    <label htmlFor={inputId} className='setting-block'>
      <p className='common-text setting-block__common-text'>{label}</p>
      <input
        className={`setting-block__input ${size}`}
        type={inputType}
        required
        id={inputId}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </label>
  );
};

export default SettingBlock;
