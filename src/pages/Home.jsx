import React, {useState, useEffect, useRef} from 'react';
import {useStoreState} from 'easy-peasy';
import {Layout, Nav, Screens, Particles } from './../components/Home';

const Home = () => {
    const lang = useStoreState(state => state.lang.current);
    const [activeScreen, setActiveScreen] = useState(0);
    const [timer, setTimer] = useState(null);
    const [elems, setElems] = useState(null);
    const homeElem  = useRef(null);

    useEffect(() => {
        const elem = homeElem.current;
        elem.addEventListener('wheel', wheelHandler, {passive: false})
    }, []);

    useEffect(() => {
        const el = [...document.querySelectorAll('.Screens .item')];
        setElems(el);
    }, [lang]);

    const moveNext = () => {
        const nextNum = activeScreen + 1;
        elems[nextNum].scrollIntoView();
        setActiveScreen(nextNum);
    }

    const movePrev = () => {
        const prevNum = activeScreen - 1;
        elems[prevNum].scrollIntoView();
        setActiveScreen(prevNum);
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
                if (activeScreen >= 6) {
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
            <Layout>
                <Particles />
                <Nav 
                    activeLink={activeScreen}
                    setActiveLink={setActiveScreen}    
                />
                <Screens activeScreen={activeScreen} setActiveScreen={setActiveScreen}/>
            </Layout>
        </div>
    );
};

export default Home;
