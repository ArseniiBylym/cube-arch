import React, {useState, useEffect} from 'react';
import styles from './EventCard.module.scss';
import Grid from '@material-ui/core/Grid';
import {useStoreState} from 'easy-peasy';
import {LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import {Spinner} from './';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {data} from '../../assets/data/index';

export const EventCard = trackWindowScroll(({cardType, id, fileUrl, image, readMore, name, datetime, scrollPosition}) => {
    const [content, setContent] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const lang = useStoreState(state => state.lang.current);

    // useEffect(() => preloadImage(), [])

    useEffect(() => {
        const content = data.lang[lang].pages[cardType];
        setContent(content);
    }, [lang]);

    // const preloadImage = () => {
    //     const img = new Image();
    //     img.onload = () => {setImageLoaded(true)}
    //     img.src = fileUrl || image;
    // }

    const isFutureDate = date => {
        return Date.now() < date;
    }

    if (!content) return <Spinner />;
    return (
        <Grid key={id} item xs={12} md={6} className={styles.card}>
        <Link to={`/${cardType}/${id}`}>
            <div className={styles.card__container}>
                <LazyLoadImage
                    height="auto"
                    src={fileUrl || image}
                    scrollPosition={scrollPosition}
                    width="100%"
                    className={styles.card__image}
                    afterLoad={() => setImageLoaded(true)}
                />
                <div className={styles.card__details}>
                    <div className={styles.card__details__text}>{content.readMore}</div>
                </div>
                    {!imageLoaded && <Spinner bgColor="white"/>}
                <div className={styles.card__info}>
                    <div className={styles.card__info__name}>{name[lang]}</div>
                    {isFutureDate(+datetime) && (
                        <div className={styles.card__info__date}>
                            <span>{moment(+datetime).format("DD/MM/YYYY")} </span>
                            <span>{moment(+datetime).format("HH:mm")}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    </Grid>
    )
});

