import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import styles from './ClassContainer.module.scss';

export const ClassContainer = props => {
    const {datetime, details, duration, image, name, open, place, price, auditory, lang, text} = props;

    return (
        <Grid container className={styles.root} justify="center" >
            <Grid item xs={12} md={10} >
                <div className={styles.name}>{name[lang]}</div>
                <div className={styles.image} style={{backgroundImage: `url(${image})`}} />
                <div className={styles.content}>
                    <div className={styles.place}>{place[lang]}</div>
                    <div className={styles.datetime}>
                        <div className={styles.date}>{moment(datetime).format("DD-MM-YYYY")}</div>
                        <div className={styles.time}>{moment(datetime).format("HH:mm")}</div>
                    </div>
                    <div className={styles.details}><pre>{details[lang]}</pre></div>
                    <div className={styles.price}><span>{text.price}:</span> {price[lang]}</div>
                    <div className={styles.duration}><span>{text.duration}:</span> {duration[lang]}</div>
                    <div className={styles.auditory}><span>{text.auditory}:</span> {auditory[lang]}</div>
                    <div className={styles.controls}>
                        {open ? (
                            <div className={styles.registerOpen}>{text.apply}</div>
                        ) : (
                            <div className={styles.registerClosed}>{text.closed}</div>
                        )}
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}