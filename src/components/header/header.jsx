import React from 'react';
import UserNavigation from '../userNavigation/userNavigation';
import './header.css'
import Home from '@/icons/home';

const Header = () => {
    return (
        <section className={'header'}>
            <div className={'header__container'}>
                <Home width={'20'} height={'20'}/>
                <UserNavigation/>
            </div>
        </section>

    );
};

export default Header;