import React from 'react';
import './homePage.css';

const AllNews = React.lazy(() => import('@/components/allNews/allNews'));
const HomePage = () => {
  return (
    <section>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AllNews />
      </React.Suspense>
    </section>
  );
};

export default HomePage;
