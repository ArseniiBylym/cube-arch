import React, {useState, useEffect} from 'react';
import Microlink from '@microlink/react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {Api} from '../api/index';
import {data} from '../assets/data/index';

import styles from './styles/modules/articles.module.scss';

const Articles = () => {
    const [articles, setArticles] = useState(null);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const fetchedArticles = Api.getArticles();
        setArticles(fetchedArticles);
    }, []);
    useEffect(() => {
        const content = data.lang[lang].pages.articles;
        setContent(content);
    }, [lang]);

    if (!articles || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />

                {articles.map(item => (
                    <Grid container  wrap="nowrap" alignItems="center" justify="center" className={styles.container}>
                        <Grid item xs={12} sm={10} lg={8} xl={6} className={styles.section} >
                            <Grid container>
                                <Grid item xs={12} md={4} className={styles.title}>{item.title[lang]}</Grid>
                                <Grid item xs={12} md={8} className={styles.link}>
                                    <Microlink 
                                        url={item.linkUrl} 
                                        size="large" 
                                        style={{ fontFamily: "Jura, sans-serif" }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </div>
        </>
    );
};

export default Articles;
