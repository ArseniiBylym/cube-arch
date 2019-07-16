import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import moment from 'moment';
import {Spinner, PageTitle, Particles} from '../../../components/shared';
import {TourContainer, MenuButton} from '../../../components/Tours'
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Tours.module.scss';

const Tours = () => {
    const [tours, setTours] = useState(null);
    const [content, setContent] = useState(null);
    const [drawer, setDrawer] = useState(false);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        fetchTours();
    }, [])

    useEffect(() => {
        const content = data.lang[lang].pages.tours;
        setContent(content)
    }, [lang])

    const fetchTours = async () => {
        try {
            // const {docs} = await Api.tours.getAll();
            // setGroups(docs);
            const result = await Api.tours.getAll();
            setTours(result.sort((a, b) => a.datetime.getTime() - b.datetime.getTime()))
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
                        <span>{moment(item.datetime).format("DD-MM-YYYY")}</span> - {item.name[lang]}
                    </a>
                )
            })}
        </div>
    )

    if (!tours || !content) return <Spinner />;
    return (
        <>
            <Particles />
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
                anchor="right" 
                onClose={() => setDrawer(false)}
            >
                {getMenuList()}
            </Drawer>
        </>
    );
};

export default Tours;
