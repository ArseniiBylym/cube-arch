import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import classNames from 'classnames';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {ClassContainer} from '../components/Classes'
import {Api} from '../api/index';
import {data} from '../assets/data/index';
import styles from './styles/modules/classes.module.scss';

const Classes = () => {
    const [classes, setClasses] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        const fetchedClasses = Api.getClasses();
        setClasses(fetchedClasses.sort((a, b) => a.datetime.getTime() - b.datetime.getTime()))
        setSelectedClass(fetchedClasses[0]);
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.classes;
        setContent(content)
    }, [lang])

    const getToursMenuList = () => {
        return classes.map((tour, index) => (
            <div 
                key={tour.id} 
                className={classNames({[styles.item]: true, [styles.selected]: tour.id === selectedClass.id})}
                onClick={() => setSelectedClass(tour)}
            >
                <div className={styles.date}>{moment(tour.datetime).format("DD-MM-YYYY")}</div>
                <div className={styles.name}>{tour.name[lang]}</div>
            </div>
        ))
    }

    if (!classes || !content) return <Spinner />;
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
                            <ClassContainer  {...selectedClass} lang={lang} text={content.details} />
                        </Grid> 
                        
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Classes;
