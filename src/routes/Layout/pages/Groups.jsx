import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Spinner, PageTitle, Particles} from '../../../components/shared';
import {Group} from '../../../components/Groups'
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Groups.module.scss';

const Groups = () => {
    const [groups, setGroups] = useState(null);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const content = data.lang[lang].pages.groups;
        setContent(content)
    }, [lang])

    useEffect(() => {
        fetchGroups();
    }, [])

    const fetchGroups = async() => {
        try {
            // const {docs} = await Api.groups.getAll();
            // setGroups(docs);
            const result = await Api.groups.getAll();
            setGroups(result);
        } catch (error) {
            console.log(error)
        }
    }

    const getGroups = () => {
        return (
            <div className={styles.main}>
                {groups.map((item, index) => {
                    return (
                        <Grid key={item.id} container className={styles.section} >
                            {index % 2 === 0 ? (
                                <>
                                <Grid item xs={12} md={10} className={styles.card}>
                                    <Group {...item} dir="ltr"/>
                                </Grid>
                                <Grid item xs={false} md={2} />
                                </>
                            ) : (
                                <>
                                <Grid item xs={false} md={2} />
                                <Grid item xs={12} md={10} className={styles.card}>
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
