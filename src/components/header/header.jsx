import React from 'react';
import UserNavigation from '../userNavigation/userNavigation';
import './header.css';
import { useAuth } from '@/hooks/use-auth';
import Tweeter from '@/icons/tweeter';

const Header = () => {
  const { isAuth } = useAuth();
  if (isAuth) {
    return (
      <section className='header'>
        <div className='header__container'>
          <Tweeter width={'90'} height={'20'} />
          <UserNavigation />
        </div>
      </section>
    );
  }
};

export default Header;
