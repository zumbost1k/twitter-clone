import React, { useEffect, useState } from 'react';
import './hashtagFilter.css';
import { format } from 'numerable';
import { useNavigate } from 'react-router-dom';

const HashtagFilter = ({ hashtags }) => {
  const [hashtag, setHashtag] = useState('allNews');
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?hashtag=${hashtag}`);
  }, [hashtag, navigate]);

  return (
    <section className='hashtag-filter-section'>
      <div className='container hashtag-filter-section__container'>
        <h3 className='dark-text container__dark-text'>Trends for you</h3>
        <div className='hashtags container__hashtags'>
          {hashtags.map((currentHashtag) => {
            return (
              <div
                key={currentHashtag.hashtagName}
                onClick={() => {
                  setHashtag(currentHashtag.hashtagName);
                }}
                className='hashtag'
              >
                <h4 className='dark-text hashtag__dark-text'>
                  {currentHashtag.hashtagName}
                </h4>
                <p className='common-text hashtag__common-text'>
                  {format(currentHashtag.tweetsQuantity, '0a')} Tweets
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HashtagFilter;
