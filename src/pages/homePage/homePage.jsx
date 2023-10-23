import React from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';

const HomePage = () => {
  return (
    <section className='home-page'>
      <AddNews />
      <AllNews isUserPage={false} />
    </section>
  );
};

export default HomePage;
