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
import Header from './components/header/header';
import BookmarksPage from './pages/bookmarksPage/bookmarksPage';
import Registration from './components/registration/registration';
import { useAuth } from './hooks/use-auth';
import Authorization from './components/authorization/authorization';

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to='/registration' />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ScrollToTop />
        <Header/>
        <Routes>
          <Route path='/registration' element={<UserPage />} />
          <Route path='/home' element={<Registration />} />
          <Route path='/authorization' element={<Authorization />} />
          <Route path='/*' element={<Navigate to='/registration'/>} />
          <Route
            path='user/currentUser'
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/user/:id'
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/explore'
            element={
              <PrivateRoute>
                <ExplorePage />
              </PrivateRoute>
            }
          />
          <Route path='/bookmarks' element={<BookmarksPage />} />
        </Routes>

        <Navigation />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
