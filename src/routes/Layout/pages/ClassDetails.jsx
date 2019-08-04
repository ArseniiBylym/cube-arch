import React, {useState, useEffect, useLayoutEffect} from 'react';
import styles from './styles/ClassDetails.module.scss';
import {useStoreState} from 'easy-peasy';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import {Spinner} from './../../../components/shared';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import {  ClassRegisterModal, ClassOrderModal} from './../../../components/modals';

const ClassDetails = props => {
    const [registerModal, setRegisterModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);

    const [content, setContent] = useState(null);
    const classes = useStoreState(state => state.content.classes);
    const lang = useStoreState(state => state.lang.current);
    const [classItem, setClassItem] = useState(null);

    useLayoutEffect(() => {
        const header = document.getElementById('header');
        header.scrollIntoView();
    }, [])

    useEffect(() => {
        if (!classes) {
            fetchCurrentClass();
        } else {
            const classId = props.match.params.id;
            const classItem = classes.find(item => item.id === classId);
            setClassItem(classItem);
        }
    }, [props.match.params.id]);

    useEffect(() => {
        const content = data.lang[lang].pages.classes;
        setContent(content);
    }, [lang]);

    const fetchCurrentClass = async () => {
        try {
            const doc = await Api.classes.getClass(props.match.params.id);
            if (doc.exists) {
                setClassItem({...doc.data(), id: doc.id});
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isFutureDate = date => {
        return Date.now() < date;
    }

    if (!content || !classItem) return <Spinner />;
    const {id, datetime, description, duration, image, fileUrl, name, open, place, price, auditory, orderable } = classItem
    return (
        <>
        <div className={styles.root}>
            <div className={styles.title}>{name[lang]}</div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} className={styles.image__wrapper}>
                    <div
                        className={styles.image__content}
                        style={{backgroundImage: `url(${fileUrl || image}`}}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={styles.info}
                    container
                    direction="column"
                    justify="space-between"
                >
                    {isFutureDate(+datetime) && (
                        <>
                            <div className={styles.info__startDate}>
                                <div>{content.details.date}</div>
                                <div>{moment(+datetime).format('DD-MM-YYYY')}</div>
                            </div>
                            <div className={styles.info__endDate}>
                                <div>{content.details.time}</div>
                                <div>{moment(+datetime).format('HH:mm')}</div>
                            </div>
                        </>
                    )}
                    
                    <div className={styles.info__duration}>
                        <div>{content.details.duration}</div>
                        <div>{duration[lang]}</div>
                    </div>
                    <div className={styles.info__auditory}>
                        <div>{content.details.auditory}</div>
                        <div>{auditory[lang]}</div>
                    </div>
                    {isFutureDate(+datetime) && place[lang] && (
                        <div className={styles.info__place}>
                            <div>{content.details.place}</div>
                            <div>{place[lang]}</div>
                        </div>
                    )}
                    <div className={styles.info__price}>
                        <div>{content.details.price}</div>
                        <div>{price[lang]}</div>
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.register}>
                            {open ? (
                                <div
                                    onClick={() => setRegisterModal(true)}
                                    className={styles.register__open}
                                >
                                    {content.details.apply}
                                </div>
                            ) : (
                                <div className={styles.register__closed}>{content.details.closed}</div>
                            )}
                        </div>
                        <div className={styles.order}>
                            {orderable && (
                                <div
                                    onClick={() => setOrderModal(true)}
                                    className={styles.order__open}
                                >
                                    {content.details.order}
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} className={styles.description}>
                    <div className={styles.description__title}>{content.details.description}</div>
                    <div className={styles.description__content}><pre>{description[lang]}</pre></div>
                </Grid>
            </Grid>
        </div>
        <ClassRegisterModal open={registerModal} closeModal={() => setRegisterModal(false)} {...{eventId: id, eventName: name, datetime}}/>
        <ClassOrderModal open={orderModal} closeModal={() => setOrderModal(false)} {...{eventId: id, eventName: name}}/>
                </>
    );
};

export default ClassDetails;
