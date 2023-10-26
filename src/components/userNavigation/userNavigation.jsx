import React, {useState} from 'react';
import UserProfile from '@/icons/userProfile';
import GroupChat from "../../icons/groupChat";
import Settings from "../../icons/settings";
import Logout from "../../icons/logout";
import UserNavElement from "../../UI/userNav/UserNav";


const navLinks = [
    {
        icon: <UserProfile width={'20'} height={'20'} />,
        title: 'My Profile',
        path: `/userProfile`,
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
        title: 'Bookmarks',
        path: '/bookmarks',
    },
];

const UserNavigation = () => {

    const [activeButton, setActiveButton] = useState('My Profile');
    const [isActiveMenu, setIsActiveMenu] = useState(false);


    const interactionToolClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const mappedLinks = navLinks.map(link => {
        return (
            <li>
                <UserNavElement key={link.title}
                                navigationElement={link}
                                activeButtons={activeButton}
                                interactionToolClick={interactionToolClick}/>
            </li>
        )
    })

    return (
        <>

            <nav>
                <ul>
                    {mappedLinks}
                </ul>
            </nav>
        </>

    );
};

export default UserNavigation;