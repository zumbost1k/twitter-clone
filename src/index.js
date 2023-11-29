import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import UserPage from './pages/userPage/userPage';
import Navigation from './components/navigation/navigation';
import ScrollToTop from './components/scroll_to_top';
import ExplorePage from './pages/explorePage/explorePage';
import HomePage from './pages/homePage/homePage';
import BookmarksPage from './pages/bookmarksPage/bookmarksPage';
import Registration from './pages/registration/registration';
import Authorization from './pages/authorization/authorization';
import Header from './components/header/header';
import SettingsPage from './pages/settingPage/settingsPage';
import SetUserAuth from './components/SetUserAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <SetUserAuth />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/authorization' element={<Authorization />} />
          <Route path='/*' element={<Navigate to='/registration' />} />
          <Route path='user/currentUser' element={<UserPage />} />
          <Route path='/userSettings' element={<SettingsPage />} />
          <Route path='/user/:id' element={<UserPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/bookmarks' element={<BookmarksPage />} />
        </Routes>

        <Navigation />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
