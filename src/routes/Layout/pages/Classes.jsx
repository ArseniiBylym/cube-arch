import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import {Spinner, PageTitle} from '../../../components/shared';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Programs.module.scss';
import {Link} from 'react-router-dom';

const Classes = () => {
    const classes = useStoreState(state => state.content.classes);
    const setClasses = useStoreActions(state => state.content.setClasses);
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        if (!classes) {
            fetchClasses();
        }
    }, []);

    useEffect(() => {
        const content = data.lang[lang].pages.classes;
        setContent(content);
    }, [lang]);

    const fetchClasses = async () => {
        try {
            const snapshot = await Api.classes.getAll();
            const today = Date.now();
            const newEvents = [];
            const oldEvents = [];
            snapshot.forEach(doc => {
                doc.data().datetime > today
                    ? newEvents.push({...doc.data(), id: doc.id})
                    : oldEvents.push({...doc.data(), id: doc.id});
            });
            setClasses([...newEvents, ...oldEvents]);
        } catch (error) {
            console.log(error);
        }
    };
    const isFutureDate = date => {
        return Date.now() < date;
    }

    const getClasses = () => {
        return (
            <Grid container spacing={6}>
                {classes.map(item => (
                    <Grid key={item.id} item xs={12} md={6} className={styles.program}>
                        <Link to={`/classes/${item.id}`}>
                            <div className={styles.program__container}>
                                <div className={styles.program__image} style={{backgroundImage: `url(${item.fileUrl || item.image})`}}>
                                    <div className={styles.program__details}>{content.readMore}</div>
                                </div>
                                <div className={styles.program__info}>
                                    <div className={styles.program__info__name}>{item.name[lang]}</div>
                                    {isFutureDate(+item.datetime) && (
                                        <div className={styles.program__info__date}>
                                            <span>{moment(+item.datetime).format("DD/MM/YYYY")} </span>
                                            <span>{moment(+item.datetime).format("HH:mm")}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (!classes || !content) return <Spinner />;
    return (
        <div className={styles.root}>
            <PageTitle title={content.title} description={content.description} />
            {getClasses()}
        </div>
    );
};

export default Classes;
