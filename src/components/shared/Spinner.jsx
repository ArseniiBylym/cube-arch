import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Spinner.module.scss';

export const Spinner = ({bgColor}) => {
    const background = bgColor || '#efefefa4';

    return (
        <div className={styles.root} style={{backgroundColor: background}}>
            <CircularProgress className={styles.spinner} classes={{
                svg: styles.circle
            }}/>
        </div>
    )
}