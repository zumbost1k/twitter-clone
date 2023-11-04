import React, { useEffect, useState } from 'react';
import './hashtagFilter.css';
import { format } from 'numerable';
import { useNavigate } from 'react-router-dom';

const hashtags = [
  {
    hashtagName: 'programming',
    tweetsQuantity: 234000,
  },
  {
    hashtagName: 'devchallenges',
    tweetsQuantity: 234000,
  },
  {
    hashtagName: 'frontend',
    tweetsQuantity: 123000,
  },
  {
    hashtagName: '100DaysOfCode',
    tweetsQuantity: 11500,
  },
  {
    hashtagName: 'helsinki',
    tweetsQuantity: 5000,
  },

  {
    hashtagName: 'learntocode',
    tweetsQuantity: 1000,
  },
];

const HashtagFilter = () => {
  const [filter, setFilter] = useState('allNews');
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`?hashtag=${filter}`);
  }, [filter, navigate]);
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
                  setFilter(currentHashtag.hashtagName);
                }}
                className='hashtag'
              >
                <h4 className='dark-text hashtag__dark-text'>
                  #{currentHashtag.hashtagName}
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
