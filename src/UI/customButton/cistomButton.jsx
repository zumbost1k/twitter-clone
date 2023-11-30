import React from 'react';
import './customButton.css';

const CustomButton = ({
  content,
  onClickfunction,
  size,
  type,
  disabledState,
  activeClass = 'blue',
}) => {
  return (
    <button
      type={type}
      className={`button ${activeClass} ${size}`}
      disabled={disabledState}
      onClick={onClickfunction}
    >
      {content}
    </button>
  );
};

export default CustomButton;
