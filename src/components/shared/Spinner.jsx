import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Spinner.module.scss';

export const Spinner  = () => {
    return (
        <div className={styles.root}>
            <CircularProgress className={styles.spinner} classes={{
                svg: styles.circle
            }}/>
        </div>
    )
}