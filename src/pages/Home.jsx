import React, {useState, useEffect, useRef} from 'react';
import {Nav, Screens} from './../components/Home';
import {Particles} from '../components/shared'
import './styles.scss';

const SCREENS_LEN = 8;

const Home = () => {
    const [activeScreen, setActiveScreen] = useState(0);
    const [timer, setTimer] = useState(null);
    const homeElem  = useRef(null);

    useEffect(() => {
        const elem = homeElem.current;
        elem.addEventListener('wheel', wheelHandler, {passive: false})
        return function() {
            elem.removeEventListener('wheel', wheelHandler)
        }
    }, []);

    useEffect(() => {
        document.body.addEventListener('keydown', onKeyDownHandler)
        return function () {
            document.body.removeEventListener('keydown', onKeyDownHandler)
        }
    }, [activeScreen])

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
        }, 800)
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

    return (
        <div className="Home" ref={homeElem} onWheel={onWheel}>
            <Particles />
            <Nav 
                activeLink={activeScreen}
                setActiveLink={setActiveScreen}    
            />
            <Screens activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
        </div>
    );
};

export default Home;
