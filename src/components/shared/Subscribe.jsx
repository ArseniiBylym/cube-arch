import React, {useState, useEffect} from 'react';
import styles from './Subscribe.module.scss';
import {FaRegBell} from 'react-icons/fa';
import { SubscribeModal } from './../modals';

export const Subscribe = props => {
    const [modal, setModal] = useState(false);

    useEffect(() =>  {
        setTimeout(() => {
            const visit = localStorage.getItem('visitCounter');
            if (visit === '2') return;
            visit === '1' ? localStorage.setItem('visitCounter', '2') : localStorage.setItem('visitCounter', '1');
            setModal(true);
        }, 2 * 60 * 1000)
    }, []) 

    const clickHandler = (e) => {
        localStorage.setItem('visitCounter', '2');
        setModal(true)
    }

    return (
        <>
            <div id="subscribeButton" className={styles.root} onClick={clickHandler}>
                <div className={styles.button}><FaRegBell /></div>
            </div>
            <SubscribeModal open={modal} closeModal={() => setModal(false)} />
        </>
    )
}