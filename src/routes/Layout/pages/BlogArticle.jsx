import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import Grid from '@material-ui/core/Grid';
import styles from './styles/BlogArticle.module.scss';
import { Spinner } from '../../../components/shared';
import { Api } from '../../../api/index';

const BlogArticle = props => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const postId = props.match.params.id;
        const post = Api.getBlogArticle(postId);
        setPost(post)
    }, [])


    if (!post) return <Spinner />
    return (
        <Grid container className={styles.root}>
            <Grid item xs={12}>
                <ReactMarkdown source={post.text} />
            </Grid>
        </Grid>
    )
}

export default BlogArticle;