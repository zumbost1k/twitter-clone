import React from 'react';
import './customButton.css';

const CustomButton = ({ content, onClickfunction, size,type }) => {
  return (
    <button
      type={type}
      className={`button ${size}`}
      onClick={onClickfunction}
    >
      {content}
    </button>
  );
};

export default CustomButton;
