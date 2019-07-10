import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import styles from './TourContainer.module.scss';

export const TourContainer = props => {
    const {datetime, details, duration, id, image, lang, name, open, orderable, place, price, text} = props;

    return (
        <Grid container className={styles.root} justify="center"  >
            <Grid item xs={12} md={10} >
                <div className={styles.name}>{name[lang]}</div>
                <div className={styles.image} style={{backgroundImage: `url(${image})`}} />
                <div className={styles.content}>
                    <div className={styles.place}>{place[lang]}</div>
                    <div className={styles.datetime}>
                        <div className={styles.time}>{moment(datetime).format("HH : mm")}</div>
                        <div className={styles.date}>{moment(datetime).format("DD-MM-YYYY")}</div>
                    </div>
                    <div className={styles.details}>{details[lang]}</div>
                    <div className={styles.price}>{text.price}: &#8372; {price}</div>
                    <div className={styles.controls}>
                        {open ? (
                            <div className={styles.registerOpen}>{text.apply}</div>
                        ) : (
                            <div className={styles.registerClosed}>{text.closed}</div>
                        )}
                        {orderable ? <div className={styles.order}>{text.order}</div> : null
                        }
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}