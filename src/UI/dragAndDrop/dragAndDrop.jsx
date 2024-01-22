import React, { useState } from 'react';
import './dragAndDrop.css';
import Uploud from '@/icons/upload';
const DragAndDrop = ({ changeImg }) => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  return (
    <label
      htmlFor='add-post-photo'
      className='uplouder uplouder-section__uplouder'
    >
      <input
        onChange={changeImg}
        type='file'
        id='add-post-photo'
        accept='image/,.png,.jpeg,.jpg'
        style={{ display: 'none' }}
      />
      {drag ? (
        <div
          className='drag uplouder__drag uplouder__drag_active-drag'
          onDragEnter={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => changeImg(e)}
        >
          <div className='drag__photo'>
            <Uploud />
          </div>
          <p className='common-text drag__text'>Drop your image here</p>
        </div>
      ) : (
        <div
          onDragEnter={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          className='drag uplouder__drag'
        >
          <div className='drag__photo'>
            <Uploud />
          </div>
          <p className='common-text drag__text'>
            Drag your image here or choose a file
          </p>
          <p className='common-text drag__common-text'>1MB max photo size</p>
        </div>
      )}
    </label>
  );
};

export default DragAndDrop;
