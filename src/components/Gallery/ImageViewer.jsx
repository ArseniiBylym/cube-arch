import React from 'react';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import classNames from 'classnames'

import styles from './ImageViewer.module.scss';

export const ImageViewer = ({picture, closeHandler, changePicture}) => {
    return (
        <div className={styles.root} >
            <div onClick={() => changePicture(+picture.index - 1)} className={classNames(styles.navButton, styles.prevImage)}><MdKeyboardArrowLeft /></div>
            <div onClick={closeHandler}  className={styles.image} style={{backgroundImage: `url(${picture.image})`}} />
            <div onClick={() => changePicture(+picture.index + 1)} className={classNames(styles.navButton, styles.nextImage)}><MdKeyboardArrowRight /></div>
        </div>
    )
}