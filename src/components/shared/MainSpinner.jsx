import React from 'react';
import styles from './MainSpinner.module.scss';

export const MainSpinner = ({bgColor}) => {
    const background = bgColor || '#efefefa4';

    return (
        <div className={styles.root} style={{backgroundColor: background}}>
            <div className={styles.spinner}></div>
        </div>
    )
}