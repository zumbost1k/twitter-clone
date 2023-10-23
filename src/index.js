import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import HomePage from './pages/homePage/homePage';
import Navigation from './components/navigation/navigation';
import ScrollToTop from './components/scroll_to_top';
import ExplorePage from './pages/explorePage/explorePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ScrollToTop />
        <Routes>
          <Route path='/user/:id' element={<HomePage />} />
          <Route path='*' element={<Navigate to='user/currentUser' />} />
          <Route path='/explore' element={<ExplorePage />} />
        </Routes>
        <Navigation />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
