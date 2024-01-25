import React, { useEffect, useState } from 'react';
import './contentFilter.css';
import { useNavigate } from 'react-router-dom';

const ContentFilter = ({ filterLinks, filterInitial, getNewsByFilter }) => {
  const [filter, setFilter] = useState(filterInitial);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate(`?filter=${filter}`);
  // }, [filter, navigate]);

  useEffect(() => {
    getNewsByFilter(filter);
  }, [filter, getNewsByFilter]);

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
                checked={link.id === filter}
                onChange={() => setFilter(link.id)}
              />
              <div className='common-text filter-element__common-text'>
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
