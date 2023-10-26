import React from 'react';
import './userNav.css';
import {Link} from 'react-router-dom';

const UserNavElement = ({
                            navigationElement,
                            interactionToolClick,
                            activeButtons,
                        }) => {
    return (
        <Link
            onClick={() => {
                interactionToolClick(navigationElement.title);
            }}
            className={
                activeButtons !== navigationElement.title
                    ? `navigation-item`
                    : `navigation-item navigation-item_active`
            }
            to={navigationElement.path}
        >
            <span className={'nav-icon'}>{navigationElement.icon}</span>
            <span>{navigationElement.title}</span>
        </Link>
    );
};
export default UserNavElement;
