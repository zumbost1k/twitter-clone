import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import HomePage from './pages/homePage/homePage';
import ExplorePage from "./pages/explorePage/explorePage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
