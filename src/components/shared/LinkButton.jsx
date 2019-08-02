import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LinkButton.module.scss';
import classNames from 'classnames'

export const LinkButton = props => {
    const {linkUrl, linkText, color} = props;
    const colorTheme = color === 'secondary' ? styles.secondary: styles.primary;

    return (
        <Link to={linkUrl} className={classNames(styles.root, colorTheme)}>
            {linkText}
        </Link>
    );
};
