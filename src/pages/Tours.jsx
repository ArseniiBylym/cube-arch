import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {TourContainer} from '../components/Tours'
import {Api} from '../api/index';
import {data} from '../assets/data/index';
import styles from './styles/modules/tours.module.scss';



const Tours = () => {
    const [tours, setTours] = useState(null);
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        const fetchedTours = Api.getTours();
        setTours(fetchedTours)
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.tours;
        setContent(content)
    }, [lang])


    const getTours = () => {
        return tours.map(item => {
            return (
                <div key={item.id}>
                    <TourContainer  {...item} lang={lang} text={content.details} />
                    <hr/>
                </div>
            )
        })
    }

    if (!tours || !content) return <Spinner />;
    return (
        <>
        <Particles />
        <div className={styles.root}>
            <PageTitle title={content.title} description={content.description} />
            <div className={styles.main}>
                {getTours()}
            </div>
        </div>
    </>
    );
};

export default Tours;
