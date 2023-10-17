import React from 'react';
import './contentFilter.css';

const filterLinks = [
  {
    labelText: 'Tweets',
    id: 'tweets',
  },
  {
    labelText: 'Tweets & replies',
    id: 'replies',
  },
  {
    labelText: 'Media',
    id: 'media',
  },
  {
    labelText: 'Likes',
    id: 'likes',
  },
];

const ContentFilter = () => {
  return (
    <section className='content-filter'>
      <form className='container content-filter__container'>
        {filterLinks.map((link) => {
          return (
            <label className='filter-element' htmlFor={link.id} key={link.id}>
              <input
                className='radio filter-element__radio'
                type='radio'
                id={link.id}
                name='filter-link'
              />
              <div className=' common-text filter-element__common-text'>
                {link.labelText}
              </div>
            </label>
          );
        })}
      </form>
    </section>
  );
};

export default ContentFilter;
