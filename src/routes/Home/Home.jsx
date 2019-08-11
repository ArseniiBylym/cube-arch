import React, {useState, useEffect, useRef} from 'react';
import {Screens} from '../../components/Home';
import {Particles} from '../../components/shared'
import styles from './Home.module.scss';
import {Header} from '../../components/Layout'
import { Spinner } from './../../components/shared';
import mainImage from '../../assets/images/home/home1-min.jpg';

const SCREENS_LEN = 9;

const Home = () => {
    const [activeScreen, setActiveScreen] = useState(0);
    const [timer, setTimer] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const homeElem  = useRef(null);

    useEffect(() => preloadImage(), [])

    useEffect(() => {
        const elem = homeElem.current;
        if (!elem) return;
        elem.addEventListener('wheel', wheelHandler, {passive: false})
        return function() {
            elem.removeEventListener('wheel', wheelHandler)
        }
    }, [pageLoaded]);

    useEffect(() => {
        document.body.addEventListener('keydown', onKeyDownHandler)
        return function () {
            document.body.removeEventListener('keydown', onKeyDownHandler)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeScreen])

    const preloadImage = () => {
        const img = new Image();
        img.onload = () => {setPageLoaded(true)}
        img.src = mainImage;
    }

    const moveNext = () => {
        const nextNum = activeScreen + 1;
        const elem = [...document.querySelectorAll('.Screens .item')][nextNum];
        elem.scrollIntoView();
        setActiveScreen(nextNum);
    }

    const movePrev = () => {
        const prevNum = activeScreen - 1;
        const elem = [...document.querySelectorAll('.Screens .item')][prevNum];
        elem.scrollIntoView();
        setActiveScreen(prevNum);
    }

    const onKeyDownHandler = e => {
        const key = e.key;
        if (key === 'ArrowDown' || key === 'ArrowUp') e.preventDefault();
        switch (key) {
            case 'ArrowDown': 
                if (activeScreen >= SCREENS_LEN) {
                    return false
                } else {
                    moveNext();
                }
                break;
            case 'ArrowUp':
                if (activeScreen === 0) {
                    return false
                } else {
                    movePrev();
                }
                break
            default: 
                break;
        }
    }

    const onWheel = (e) => {
        if (timer) return;
        const timestamp = setTimeout(() => {
            setTimer(null);
        }, 500)
        setTimer(timestamp);
        const dir = e.deltaY > 0 ? 'down' : 'up'
        switch (dir) {
            case 'down': 
                if (activeScreen >= SCREENS_LEN) {
                    return false
                } else {
                    moveNext();
                }
                break
            case 'up': 
                if (activeScreen === 0) {
                    return false
                } else {
                    movePrev();
                }
                break
            default: 
                break;
        }
    }

    const wheelHandler = e => {
        e.preventDefault();
    }

    if (!pageLoaded) return <Spinner bgColor="white"/>
    return (
        <div className={styles.root} ref={homeElem} onWheel={onWheel}>
            <Particles />
            <div className={styles.header}>
                <Header />
            </div>
            <Screens />
        </div>
    );
};

export default Home;
