import React from 'react';
import './newsItemButton.css';

const NewsItemButton = ({
  icon,
  tweetId,
  isChecked,
  onClickFunction,
  buttonName,
  activeClass,
  Text,
}) => {
  return (
    <label
      htmlFor={buttonName + tweetId}
      className={
        isChecked
          ? `interaction-tool buttons__interaction-tool ${activeClass}`
          : 'interaction-tool buttons__interaction-tool'
      }
    >
      <button
        className='send'
        id={buttonName + tweetId}
        onClick={() => onClickFunction(tweetId)}
      >
        {icon}
      </button>
      <p
        className={
          isChecked
            ? `text interaction-tool__text ${activeClass}`
            : `text interaction-tool__text`
        }
      >
        {Text}
      </p>
    </label>
  );
};

export default NewsItemButton;
