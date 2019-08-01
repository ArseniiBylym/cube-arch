import React, {useState} from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import styles from './TourContainer.module.scss';
import {TourRegisterModal, TourOrderModal} from '../modals';

export const TourContainer = props => {
    const [registerModal, setRegisterModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const {id, datetime, description, duration, image, fileUrl, lang, name, open, orderable, place, price, text, auditory} = props;

    const isFutureDate = date => {
        return Date.now() < date;
    }
    
    return (
        <>
        <Grid container className={styles.root} justify="center"  >
            <Grid item xs={12} md={12} >
                <div className={styles.name}>{name[lang]}</div>
                <div className={styles.image} style={{backgroundImage: `url(${fileUrl || image})`}} />
                <div className={styles.content}>
                    <div className={styles.place}>{place[lang]}</div>
                    {isFutureDate(+datetime) && (
                        <div className={styles.datetime}>
                            <div className={styles.date}>{moment(+datetime).format("DD-MM-YYYY")}</div>
                            <div className={styles.time}>{moment(+datetime).format("HH:mm")}</div>
                        </div>
                    )}
                    <div className={styles.description}><pre>{description[lang]}</pre></div>
                    <div className={styles.price}><span>{text.price}:</span> {price[lang]}</div>
                    <div className={styles.duration}><span>{text.duration}:</span> {duration[lang]}</div>
                    <div className={styles.auditory}><span>{text.auditory}:</span> {auditory[lang]}</div>
                    <div className={styles.controls}>
                        {open ? (
                            <div onClick={() => setRegisterModal(true)} className={styles.registerOpen}>{text.apply}</div>
                        ) : (
                            <div className={styles.registerClosed}>{text.closed}</div>
                        )}
                        {orderable ? <div onClick={() => setOrderModal(true)} className={styles.order}>{text.order}</div> : null
                        }
                    </div>
                </div>
            </Grid>
        </Grid>
        <TourRegisterModal open={registerModal} closeModal={() => setRegisterModal(false)} {...{eventId: id, eventName: name, datetime}}/>
        <TourOrderModal open={orderModal} closeModal={() => setOrderModal(false)} {...{eventId: id, eventName: name}}/>
        </>
    )
}