import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationLink.scss';

export const NavigationLink = props => {
    const {to, className, children} = props;
    return (
        <NavLink to={to} className={className}>{children}</NavLink>
    )
}