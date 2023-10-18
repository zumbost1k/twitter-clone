import React from 'react';
import './button.css';

const CustomButton = ({ content, onClickfunction }) => {
  return (
    <button type='button' className='button' onClick={onClickfunction}>
      {content}
    </button>
  );
};

export default CustomButton;
