import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import classNames from 'classnames';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {TourContainer} from '../components/Tours'
import {Api} from '../api/index';
import {data} from '../assets/data/index';
import styles from './styles/modules/tours.module.scss';

const Tours = () => {
    const [tours, setTours] = useState(null);
    const [selectedTour, setSelectedTour] = useState(null);
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        const fetchedTours = Api.getTours();
        setTours(fetchedTours.sort((a, b) => a.datetime.getTime() - b.datetime.getTime()))
        setSelectedTour(fetchedTours[0]);
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.tours;
        setContent(content)
    }, [lang])

    const getToursMenuList = () => {
        return tours.map((tour, index) => (
            <div 
                key={tour.id} 
                className={classNames({[styles.item]: true, [styles.selected]: tour.id === selectedTour.id})}
                onClick={() => setSelectedTour(tour)}
            >
                <div className={styles.date}>{moment(tour.datetime).format("DD-MM-YYYY")}</div>
                <div className={styles.name}>{tour.name[lang]}</div>
            </div>
        ))
    }

    if (!tours || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                <div className={styles.content}>
                    <Grid container className={styles.content} direction="row-reverse" spacing={1}>
                        <Grid item xs={12} md={4} className={styles.menu}>
                            {getToursMenuList()}
                        </Grid> 
                        <Grid item xs={12} md={8} className={styles.details}>
                            <TourContainer  {...selectedTour} lang={lang} text={content.details} />
                        </Grid> 
                        
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Tours;
