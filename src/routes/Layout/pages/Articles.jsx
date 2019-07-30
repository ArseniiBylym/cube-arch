import React, {useState, useEffect} from 'react';
import Microlink from '@microlink/react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import {Spinner, PageTitle} from '../../../components/shared';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Articles.module.scss';

const Articles = () => {
    const articles = useStoreState(state => state.content.articles);
    const setArticles = useStoreActions(state => state.content.setArticles);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        if (!articles) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        const content = data.lang[lang].pages.articles;
        setContent(content);
    }, [lang]);

    const fetchData = async () => {
        try {
            const snapshot = await Api.articles.getAll();
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({...doc.data(), id: doc.id})
            });
            setArticles(articles)
        } catch (error) {
            console.log(error)
        }
    }

    const getBlogPreview = item => (
        <Link to={`/articles/${item.id}`} className={styles.blogLink}>
            <div className={styles.blogLink__header}>{item.title[lang]}</div>
            <div className={styles.blogLink__image} style={{backgroundImage: `url(${item.fileUrl || item.imageUrl})`}}/>
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
        <div className={styles.root}>
            <PageTitle title={content.title} description={content.description} />
            <Grid container spacing={7} className={styles.container}>
                {articles.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} md={6} lg={4} className={styles.section}>
                            {item.isBlog ? getBlogPreview(item) : getMicrolink(item)}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Articles;
