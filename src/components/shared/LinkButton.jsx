import React from 'react';
import {Link} from 'react-router-dom';
import './styles.scss';

export const LinkButton = props => {
    const {linkUrl, linkText} = props;
    return (
        <Link to={linkUrl} className="LinkButton">
            <div className="background" />
            {linkText}
        </Link>
    );
};
