import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LinkButton.module.scss';

export const LinkButton = props => {
    const {linkUrl, linkText} = props;
    return (
        <Link to={linkUrl} className={styles.root}>
            {/* <div className={styles.background} /> */}
            {linkText}
        </Link>
    );
};
