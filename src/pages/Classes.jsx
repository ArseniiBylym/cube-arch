import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import moment from 'moment';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {ClassContainer, MenuButton} from '../components/Classes'
import {Api} from '../api/index';
import {data} from '../assets/data/index';
import styles from './styles/modules/classes.module.scss';

const Classes = () => {
    const [classes, setClasses] = useState(null);
    const [content, setContent] = useState(null);
    const [drawer, setDrawer] = useState(false);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        const fetchedClasses = Api.getClasses();
        setClasses(fetchedClasses.sort((a, b) => a.datetime.getTime() - b.datetime.getTime()))
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.classes;
        setContent(content)
    }, [lang])

    const getClassesList = () => (
       classes.map((item, index) => (
            <Grid key={item.id} item xs={12} sm={10} lg={8} className={styles.details} id={`class_${item.id}`}>
                <ClassContainer  {...item} lang={lang} text={content.details} />
            </Grid> 
        ))
    )

    const getMenuList = () => (
        <div 
            className={styles.sidebar} 
            onClick={() => setDrawer(false)} 
            onKeyDown={() => setDrawer(false)}
        >
            {classes.map(item => {
                return (
                    <a href={`#class_${item.id}`} key={item.id} className={styles.link}>
                        <span>{moment(item.datetime).format("DD-MM-YYYY")}</span> - {item.name[lang]}
                    </a>
                )
            })}
        </div>
    )

    if (!classes || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                <div className={styles.content}>
                    <Grid container className={styles.content} justify="center" >
                        {getClassesList()}
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

export default Classes;
