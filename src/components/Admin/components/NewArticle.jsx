import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from './styles/NewArticle.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';

export const NewArticle = props => {
    const {close} = props;

    const addArticle = useStoreActions(state => state.content.addArticle);

    const [isBlog, setIsBlog] = useState(false);
    const [title, setTitle] = useState({en: '', ukr: ''});
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [text, setText] = useState({en: '', ukr: ''});

    const onTitleChange = lang => e => {
        setTitle({...title, [lang]: e.target.value});
    };
    const onTextChange = lang => e => {
        setText({...text, [lang]: e.target.value});
    };

    const onCreate = async () => {
        const newArticle = {
            isBlog,
            title,
            linkUrl,
            imageUrl,
            text,
            createdAt: new Date().getTime() + '',
        };
        if (!isBlog) {
            delete newArticle.imageUrl;
            delete newArticle.text;
        }
        console.log(newArticle)
        try {
            const doc = await Api.articles.add(newArticle);
            addArticle({...newArticle, id: doc.id});
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>Create new article</h1>
            <Grid container>
                <Grid item>Outsourced article</Grid>
                <Grid item>
                    <Switch
                        checked={isBlog}
                        onChange={() => setIsBlog(!isBlog)}
                        color="primary"
                    />
                </Grid>
                <Grid item>My blog</Grid>
            </Grid>
            <Grid container spacing={2}>
                {isBlog ? (
                    <Grid item xs={12}>
                     {/* <img src={image || imagePlaceholder} alt="" className={styles.image} /> */}
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                name="title_en"
                                label="Link url"
                                type="text"
                                fullWidth
                                required
                                onChange={e => setLinkUrl(e.target.value)}
                                variant="outlined"
                                value={linkUrl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Title</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                name="title_en"
                                label="Title"
                                type="text"
                                fullWidth
                                required
                                onChange={onTitleChange('en')}
                                variant="outlined"
                                value={title.en}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                name="title_ukr"
                                label="Заголовок"
                                type="text"
                                fullWidth
                                required
                                onChange={onTitleChange('ukr')}
                                variant="outlined"
                                value={title.ukr}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
            
            <div className={styles.buttons}>
                <Button onClick={onCreate} color="secondary" variant="contained" size="large">
                    Create
                </Button>
                <Button onClick={() => close()} color="primary" variant="contained" size="large">
                    Close
                </Button>
            </div>
        </div>
    );
};
