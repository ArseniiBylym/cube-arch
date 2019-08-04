import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Spinner, PageTitle, EventCard} from '../../../components/shared';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Programs.module.scss';

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

    const getClasses = () => {
        return (
            <Grid container spacing={6}>
                {classes.map(item => (
                    <EventCard key={item.id} cardType='classes' {...item} />
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
