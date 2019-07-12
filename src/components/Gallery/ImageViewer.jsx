import React from 'react';

import styles from './ImageViewer.module.scss';

export const ImageViewer = ({image, closeHandler}) => {
    return (
        <div className={styles.root} onClick={closeHandler} >
            <div className={styles.image} style={{backgroundImage: `url(${image})`}}/>
        </div>
    )
}