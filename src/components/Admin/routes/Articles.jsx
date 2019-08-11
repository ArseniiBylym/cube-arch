import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import Microlink from '@microlink/react';
import {MdDeleteForever, MdEdit} from 'react-icons/md'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styles from './styles.module.scss'
import { ManageArticleForm} from './../components';
import { Api } from './../../../api/index';
import { Spinner } from './../../shared/Spinner';

export const Articles = props => {
    const articles = useStoreState(state => state.content.articles);
    const setArticles = useStoreActions(state => state.content.setArticles);
    const deleteArticle = useStoreActions(state => state.content.deleteArticle);

    const [createMode, setCreateMode] = useState(false);
    const [editedArticle, setEditedArticle] = useState(null);

    useEffect(() => {
        if (!articles) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async() => {
        try {
            const snapshot = await Api.articles.getAll();
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setArticles(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = async item => {
        const {id, fileName} = item;
        try {
            if (fileName) {
                await Api.articles.deleteFile(fileName)
            }
            await Api.articles.delete(id);
            deleteArticle(id) 
        } catch (error) {
            console.log(error)
        }
    }

    const itemsList = () => {
        return articles.map(item => (
            <Grid key={item.id} item xs={12} sm={6} md={4} className={styles.section}>
                {item.isBlog ? getBlogPreview(item) : getMicrolink(item)}
            </Grid>
        ))
    }

    const getBlogPreview = item => (
        <div className={styles.blogLink}>
            <div onClick={() => deleteHandler(item)} className={styles.delete}><MdDeleteForever /></div>
            <div onClick={() => setEditedArticle(item)} className={styles.edit}><MdEdit /></div>
            <div className={styles.blogLink__header}>{item.title.ukr}</div>
            <div className={styles.blogLink__image} style={{backgroundImage: `url(${item.fileUrl || item.imageUrl})`}}/>
        </div>
    )

    const getMicrolink = item => (
        <div className={styles.articleLink}>
            <div onClick={() => deleteHandler(item)} className={styles.delete}><MdDeleteForever /></div>
            <div onClick={() => setEditedArticle(item)} className={styles.edit}><MdEdit /></div>
            <div className={styles.articleLink__header}>{item.title.ukr}</div>
            <div className={styles.articleLink__link}>
                <Microlink 
                    url={item.linkUrl} 
                    size="large" 
                    style={{ fontFamily: "Jura, sans-serif"}}
                />
            </div>
        </div>
    )

    const closeHandler = () => {
        setCreateMode(false);
        setEditedArticle(null);
    }

    if (!articles) return <Spinner />
    return (
        <div className={styles.root}>
            {(createMode || editedArticle) ? (
                <ManageArticleForm close={closeHandler} editedElem={editedArticle} />
            ) : (
                <>
                    <h1>Articles</h1>
                    <Grid container spacing={2}>
                        {itemsList()}
                    </Grid>
                    <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setCreateMode(true)}>Create new</Button>
                </>
            )}
        </div>
    )
};
