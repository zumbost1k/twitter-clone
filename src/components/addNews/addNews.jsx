import React, { useState } from 'react';
import './addNews.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/selectors/selectors';
import PhotoUpload from '@/icons/photo';
import Planet from '@/icons/planet';
import CustomButton from '@/UI/customButton/cistomButton';

const AddNews = ({ addHomePageNewsHandler }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isReplyAbility, setIsReplyAbility] = useState(true);
  const [postText, setTextPost] = useState('');
  const [postPhoto, setPostPhoto] = useState(null);
  const sendNewComment = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const hashtags = postText.match(/[#]\w+/g) || [];

    formData.append('Content', postText);
    formData.append('TweetImage', postPhoto);
    formData.append('IsPublic', isReplyAbility);
    hashtags.forEach((currentHashtag) => {
      formData.append('Hashtags', currentHashtag);
    });

    fetch(
      'https://twittercloneapiproductionenv.azurewebsites.net/Tweet/CreateTweet',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((responce) => responce.json())
      .then((data) => {
        addHomePageNewsHandler(data.data);
      });
    setTextPost('');
    setPostPhoto(null);
  };
  return (
    <section className='add-news'>
      <div className='container add-news__container'>
        <h2 className='dark-text container__dark-text'>Tweet something</h2>
        <form onSubmit={sendNewComment} className='tweet-form'>
          <div className='tweet-body'>
            <img
              src={`${currentUser.profileAvatar}`}
              alt='avatar'
              width='40'
              height='40'
              className='avatar'
            />
            <input
              value={postText}
              onChange={(e) => {
                setTextPost(e.target.value);
              }}
              className='input tweet-body__input'
              type='text'
              placeholder='What’s happening?'
              required
            />
          </div>
          <div className='buttons tweet-body__buttons'>
            <div className='tweet-buttons'>
              <div>
                <input
                  onChange={(e) => {
                    if (e.target.files[0].size < 1 * 1000 * 1024) {
                      setPostPhoto(e.target.files[0]);
                    }
                  }}
                  type='file'
                  id='file'
                  accept='image/,.png,.jpeg,.jpg'
                  style={{ display: 'none' }}
                />
                <label htmlFor='file' className='icon'>
                  <PhotoUpload width={'20'} height={'20'} />
                </label>
              </div>
              <div>
                <input
                  type='radio'
                  id='reply-ability'
                  style={{ display: 'none' }}
                  onClick={() => {
                    setIsReplyAbility(!isReplyAbility);
                  }}
                />
                <label
                  htmlFor='reply-ability'
                  className='icon tweet-buttons__icon'
                >
                  <Planet width={'20'} height={'20'} />
                  {isReplyAbility ? 'Everyone can reply' : 'Nobody can reply'}
                </label>
              </div>
            </div>
            <CustomButton
              size={'standard'}
              type={'submit'}
              content={<span className='button__tweet'>Tweet</span>}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNews;
