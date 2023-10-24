import React from 'react';
import './customButton.css';

const CustomButton = ({
  content,
  onClickfunction,
  size,
  type,
  disabledState,
}) => {
  return (
    <button
      type={type}
      className={`button ${size}`}
      disabled={disabledState}
      onClick={onClickfunction}
    >
      {content}
    </button>
  );
};

export default CustomButton;
