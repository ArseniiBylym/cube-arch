import React, {useState, useEffect} from 'react';
import {useStoreActions} from 'easy-peasy';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';
import classNames from 'classnames';
import styles from './styles.module.scss';
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

export const ManageArticleForm = props => {
    const {close, editedElem} = props;

    const addArticle = useStoreActions(state => state.content.addArticle);
    const updateArticle = useStoreActions(state => state.content.updateArticle);

    const [isBlog, setIsBlog] = useState(false);
    const [title, setTitle] = useState({en: '', ukr: ''});
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [markdownTextEn, setMarkdownTextEn] = useState('')
    const [markdownTextUkr, setMarkdownTextUkr] = useState('')
    const [selectedTabEn, setSelectedTabEn] = useState('write');
    const [selectedTabUkr, setSelectedTabUkr] = useState('write');

    useEffect(() => {
        if (editedElem) {
            const {title, imageUrl, text, linkUrl, isBlog} = editedElem;
            if (isBlog) {
                setIsBlog(true);
                setMarkdownTextEn(text.en);
                setMarkdownTextUkr(text.ukr)
                setImageUrl(imageUrl);
            } else {
                setLinkUrl(linkUrl);
            }
            setTitle({en: title.en, ukr: title.ukr})
        }
    }, [])

    const onCreate = async () => {
        const newDoc = {
            isBlog,
            title,
            linkUrl,
            imageUrl,
            text: {
                en: markdownTextEn,
                ukr: markdownTextUkr
            },
            createdAt: new Date().getTime() + '',
        };
        if (!isBlog) {
            delete newDoc.imageUrl;
            delete newDoc.text;
        }
        try {
            if (editedElem) {
                await Api.articles.update({id: editedElem.id, newDoc});
                updateArticle({...newDoc, id: editedElem.id});
            } else {
                const doc = await Api.articles.add(newDoc);
                addArticle({...newDoc, id: doc.id});
            }
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>{editedElem ? 'Update': 'Create new'} article</h1>
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
                    <>
                        <Grid item xs={12}>
                            <img src={imageUrl || imagePlaceholder} alt="" className={styles.image} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                name="image"
                                label="Image URL"
                                type="text"
                                fullWidth
                                required
                                onChange={e => setImageUrl(e.target.value)}
                                variant="outlined"
                                value={imageUrl}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                name="title_en"
                                label="Title"
                                type="text"
                                fullWidth
                                required
                                onChange={e => setTitle({...title, en: e.target.value})}
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
                                onChange={e => setTitle({...title, ukr: e.target.value})}
                                variant="outlined"
                                value={title.ukr}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Blog content (en)</h3>
                            <div className="container">
                                <ReactMde
                                    value={markdownTextEn}
                                    onChange={setMarkdownTextEn}
                                    selectedTab={selectedTabEn}
                                    onTabChange={setSelectedTabEn}
                                    generateMarkdownPreview={markdown =>
                                    Promise.resolve(converter.makeHtml(markdown))
                                    }
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Blog content (ukr)</h3>
                            <div className={classNames('container', styles.editor)}>
                                <ReactMde
                                    value={markdownTextUkr}
                                    onChange={setMarkdownTextUkr}
                                    selectedTab={selectedTabUkr}
                                    onTabChange={setSelectedTabUkr}
                                    generateMarkdownPreview={markdown =>
                                    Promise.resolve(converter.makeHtml(markdown))
                                    }
                                />
                            </div>
                        </Grid>
                    </>
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
                                onChange={e => setTitle({...title, en: e.target.value})}
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
                                onChange={e => setTitle({...title, ukr: e.target.value})}
                                variant="outlined"
                                value={title.ukr}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
            
            <div className={styles.buttons}>
                <Button onClick={onCreate} color="secondary" variant="contained" size="large">
                    {editedElem ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => close()} color="primary" variant="contained" size="large">
                    Close
                </Button>
            </div>
        </div>
    );
};
