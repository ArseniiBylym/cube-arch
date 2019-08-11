import React, {useState, useEffect, useLayoutEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import styles from './styles/BlogArticle.module.scss';
import { Spinner } from '../../../components/shared';
import { Api } from '../../../api/index';

const BlogArticle = props => {
    const [post, setPost] = useState(null);
    const lang = useStoreState(state => state.lang.current);
    const articles = useStoreState(state => state.content.articles);

    useLayoutEffect(() => {
        const header = document.getElementById('header');
        header.scrollIntoView();
    }, [])

    useEffect(() => {
        if (!articles) {
            fetchCurrentPost();
        } else {
            const postId = props.match.params.id;
            const post = articles.find(item => item.id === postId);
            setPost(post)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchCurrentPost = async () => {
        try {
            const doc = await Api.articles.getArticle(props.match.params.id);
            if (doc.exists) {
                setPost({...doc.data(), id: doc.id})
            }
        } catch (error) {
            console.log(error)
        }
    }


    if (!post) return <Spinner />
    return (
        <Grid container className={styles.root}>
            <Grid item xs={12}>
                <ReactMarkdown source={post.text[lang]} />
            </Grid>
        </Grid>
    )
}

export default BlogArticle;