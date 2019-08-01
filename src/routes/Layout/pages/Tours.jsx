import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import moment from 'moment';
import {Spinner, PageTitle} from '../../../components/shared';
import {TourContainer, MenuButton} from '../../../components/Tours'
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Tours.module.scss';

const Tours = () => {
    const tours = useStoreState(state => state.content.tours);
    const setTours = useStoreActions(state => state.content.setTours);
    const [content, setContent] = useState(null);
    const [drawer, setDrawer] = useState(false);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        if (!tours) {
            fetchTours();
        }
    }, [])

    useEffect(() => {
        const content = data.lang[lang].pages.tours;
        setContent(content)
    }, [lang])

    const fetchTours = async () => {
        try {
            const snapshot = await Api.tours.getAll();
            const today = Date.now();
            const newEvents = [];
            const oldEvents = [];
            snapshot.forEach(doc => {
                doc.data().datetime > today
                    ? newEvents.push({...doc.data(), id: doc.id})
                    : oldEvents.push({...doc.data(), id: doc.id});
            });
            setTours([...newEvents, ...oldEvents]);
        } catch (error) {
            console.log(error)
        }
    }

    const getToursList = () => (
        tours.map((item, index) => (
            <Grid key={item.id} item xs={12} sm={10} lg={8} className={styles.details} id={`tour_${item.id}`}>
                <TourContainer  {...item} lang={lang} text={content.details} />
            </Grid> 
         ))
     )
     const getMenuList = () => (
        <div 
            className={styles.sidebar} 
            onClick={() => setDrawer(false)} 
            onKeyDown={() => setDrawer(false)}
        >
            {tours.map(item => {
                return (
                    <a href={`#tour_${item.id}`} key={item.id} className={styles.link}>
                        <span>{moment(+item.datetime).format("DD-MM-YYYY")}</span> - {item.name[lang]}
                    </a>
                )
            })}
        </div>
    )

    if (!tours || !content) return <Spinner />;
    return (
        <>
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                <div className={styles.content}>
                    <Grid container className={styles.content} justify="center">
                        {getToursList()}
                    </Grid>
                </div>
            </div>
            <MenuButton openMenu={() => setDrawer(true)}/>
            <Drawer 
                open={drawer} 
                anchor="left" 
                onClose={() => setDrawer(false)}
            >
                {getMenuList()}
            </Drawer>
        </>
    );
};

export default Tours;
