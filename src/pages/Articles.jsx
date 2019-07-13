import React, {useState, useEffect} from 'react';
import Microlink from '@microlink/react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

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
        setArticles(fetchedArticles.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()));
    }, []);
    useEffect(() => {
        const content = data.lang[lang].pages.articles;
        setContent(content);
    }, [lang]);

    const getBlogPreview = item => (
        <Link to={`/articles/${item.id}`} className={styles.blogLink}>
            <div className={styles.blogLink__header}>{item.title}</div>
            <div className={styles.blogLink__image} style={{backgroundImage: `url(${item.imageUrl})`}}/>
        </Link>
    )

    const getMicrolink = item => (
        <div className={styles.articleLink}>
            <div className={styles.articleLink__header}>{item.title[lang]}</div>
            <div className={styles.articleLink__link}>
                <Microlink 
                    url={item.linkUrl} 
                    size="large" 
                    style={{ fontFamily: "Jura, sans-serif" }}
                />
            </div>
        </div>
        
    )

    if (!articles || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                <Grid container spacing={3} className={styles.container}>
                    {articles.map(item => (
                        <Grid key={item.id} item xs={12} sm={6} lg={4} className={styles.section}>
                             {item.isBlog ? getBlogPreview(item) : getMicrolink(item)}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Articles;
