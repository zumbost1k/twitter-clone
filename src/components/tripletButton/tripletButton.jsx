import React, { useState } from 'react';
import './tripletButton.css';
import Triplet from '@/icons/triplet';
import Trash from '@/icons/trash';
import CustomButton from '@/UI/customButton/cistomButton';
import Edit from '@/icons/edit';

const tripletFunctions = {
  delete: (tweetId) => {
    console.log('hello delete ' + tweetId);
  },
  update: (tweetId) => {
    console.log('hello update ' + tweetId);
  },
};

const tripletButtons = [
  {
    text: 'Delete post',
    icon: <Trash width={'16'} height={'16'} />,
    functionKey: 'delete',
  },
  {
    text: 'Edit post',
    icon: <Edit width={'16'} height={'16'} />,
    functionKey: 'update',
  },
];
const TripletButton = ({ tweetId }) => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const interactionToolClick = (buttonName) => {
    return () => {
      tripletFunctions[buttonName](tweetId);
      setIsActiveMenu(!isActiveMenu);
    };
  };
  return (
    <div className='triplet news-body__triplet'>
      <button
        onClick={() => {
          setIsActiveMenu(!isActiveMenu);
        }}
      >
        <Triplet width={'24'} height={'24'} />
      </button>
      {isActiveMenu && (
        <div className='modal triplet__modal'>
          {tripletButtons.map((currentButton) => {
            return (
              <span key={currentButton.functionKey}>
                <CustomButton
                  content={
                    <span className='triplet-btn flex-center'>
                      {currentButton.icon}
                      {currentButton.text}
                    </span>
                  }
                  onClickfunction={interactionToolClick(
                    currentButton.functionKey
                  )}
                  size={'small'}
                  type={'button'}
                  activeClass={'white'}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TripletButton;
