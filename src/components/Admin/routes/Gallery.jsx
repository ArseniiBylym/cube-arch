import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import {LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import {MdDeleteForever} from 'react-icons/md'
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from './styles.module.scss'
import { Api } from './../../../api/index';
import { Spinner } from './../../shared';

export const Gallery = trackWindowScroll(({scrollPosition}) => {
    const gallery = useStoreState(state => state.content.gallery);
    const setGallery = useStoreActions(state => state.content.setGallery);
    const addToGallery = useStoreActions(state => state.content.addToGallery);
    const removeFromGallery = useStoreActions(state => state.content.removeFromGallery);

    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('')
    const [base64, setBase64] = useState('')

    useEffect(() => {
        if (!gallery) {
            fetchData();
        }
    }, [])

    const fetchData = async() => {
        try {
            const snapshot = await Api.gallery.getAll();
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setGallery(docs)
        } catch (error) {
            console.log(error)
        }
    }
    
    const addHandler = async() => {
        await Api.gallery.uploadImage({file, callback: addToGallery});
        setBase64('');
        setModal(false)
    }

    const clearHandler = () => {
        setModal(false)
        setBase64('')
    }
    
    const deleteHandler = async (image) => {
        try {
            await Api.gallery.deleteImage({image, callback: removeFromGallery});
        } catch (error) {
            console.log(error)
        }
    }

    const onChangeHandler = e => {
        const file = e.target.files[0];
        setFile(file);
        getImageFromFile(file);
    }

    const getImageFromFile = (file) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const image = reader.result;
            setBase64(image)
        }, false)
        reader.readAsDataURL(file)

    }

    const itemsList = () => {
        return gallery.map(item => (
            <Grid item key={item.id} xs={12} sm={4} md={3} lg={2} className={styles.image}>
                <LazyLoadImage
                    height="auto"
                    src={item.url}
                    scrollPosition={scrollPosition}
                    width="100%"
                />
                <div onClick={() => deleteHandler(item)} className={styles.delete}><MdDeleteForever /></div>
            </Grid>
        ))
    }

    if (!gallery) return <Spinner />
    return (
        <div className={styles.root}>
            <h1>Gallery</h1>
            <Grid container spacing={2}>
                {itemsList()}
            </Grid>
            <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setModal(true)}>Add image</Button>
            <Dialog open={modal} onClose={() => setModal(false)}>
                <DialogTitle>Add image to the gallery</DialogTitle>
                <DialogContent>
                    <div className={styles.imagePreview} style={{backgroundImage: `url(${base64})`}}/>
                    <TextField
                        onChange={onChangeHandler}
                        type="file"
                        margin="normal"
                        variant="filled"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addHandler} color="secondary" variant="contained">Add</Button>
                    <Button onClick={clearHandler} color="primary" variant="contained">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
});

