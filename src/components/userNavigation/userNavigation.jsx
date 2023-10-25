import React, {useState} from 'react';
import UserProfile from '@/icons/userProfile';
import GroupChat from '@/icons/groupChat';
import Settings from '@/icons/settings';
import Logout from '@/icons/logout';
import UserNavElement from '@/UI/userNav/UserNav';
import {useSelector} from 'react-redux';
import './userNavigation.css'
import {selectCurrentUser} from '@/selectors/selectors';


const navLinks = [
    {
        icon: <UserProfile width={'20'} height={'20'} />,
        title: 'My Profile',
        path: `/user/currentUser`,
    },
    {
        icon: <GroupChat width={'20'} height={'20'} />,
        title: 'Group chat',
        path: '/chat',
    },
    {
        icon: <Settings width={'20'} height={'20'} />,
        title: 'Settings',
        path: '/userSettings',
    },
    {
        icon: <Logout width={'20'} height={'20'} />,
        title: 'Logout',
        path: '/logout',
    },
];

const UserNavigation = () => {

    const [activeButton, setActiveButton] = useState('My Profile');
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const currentUser = useSelector(selectCurrentUser);

    const interactionToolClick = (buttonName) => {
        setActiveButton(buttonName);
        setIsActiveMenu(!isActiveMenu);
    };

    const mappedLinks = navLinks.map(link => {
        return (
            <li className={link.title === 'Logout' && 'navigation-item_logout-element'}>
                <UserNavElement key={link.title}
                                navigationElement={link}
                                activeButtons={activeButton}
                                className={link.title === 'Logout' && 'navigation-item_logout-title'}
                                interactionToolClick={interactionToolClick}/>
            </li>
        )
    })

    return (
        <>
            <div className={'currentUser__info'} onClick={() => setIsActiveMenu(!isActiveMenu)}>
                <img src={currentUser.profileAvatar} width={'32'} height={'32'} alt='user-avatar'/>
                <span className={'currentUser__title'}>{currentUser.userName}</span>
            </div>
            <nav className={isActiveMenu ? 'currentUser__menu currentUser__menu_active' :'currentUser__menu'}>
                <ul className={'currentUser__container'}>
                    {mappedLinks}
                </ul>
            </nav>
        </>

    );
};

export default UserNavigation;