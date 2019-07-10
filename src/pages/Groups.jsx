import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {Group} from '../components/Groups'
import { Api } from '../api/index';
import {data} from '../assets/data/index';
import styles from './styles/modules/groups.module.scss';

const Groups = () => {
    const [groups, setGroups] = useState(null);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const fetchedGroups = Api.getGroups();
        setGroups(fetchedGroups)
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.groups;
        setContent(content)
    }, [lang])


    const getGroups = () => {
        return (
            <div className={styles.main}>
                {groups.map((item, index) => {
                    return (
                        <Grid key={item.id} container className={styles.section} >
                            {index % 2 === 0 ? (
                                <>
                                <Grid item sm={12} md={10} className={styles.card}>
                                    <Group {...item} dir="ltr"/>
                                </Grid>
                                <Grid item sm={false} md={2} />
                                </>
                            ) : (
                                <>
                                <Grid item sm={false} md={2} />
                                <Grid item sm={12} md={10} className={styles.card}>
                                    <Group {...item} dir="rtl"/>
                                </Grid>
                                </>
                            )
                            }
                        </Grid>
                    )
                })}
            </div>
        )
    }

    if (!groups || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                {getGroups()}
            </div>
        </>
    );
};

export default Groups;
