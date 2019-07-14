import React, {useState, useEffect} from 'react';
import styles from './Subscribe.module.scss';
import {FaRegBell} from 'react-icons/fa';
import { SubscribeModal } from './../modals';

export const Subscribe = props => {
    const [modal, setModal] = useState(false);

    useEffect(() =>  {
        setTimeout(() => {
            setModal(true);
        }, 5000)
    }, []) 

    const clickHandler = (e) => {
        setModal(true)
    }

    return (
        <>
        <div className={styles.root}>
            <div id="subscribeButton" onClick={clickHandler} className={styles.button}><FaRegBell /></div>
        </div>
        <SubscribeModal open={modal} closeModal={() => setModal(false)} />
        </>
    )
}