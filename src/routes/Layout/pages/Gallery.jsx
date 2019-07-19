import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import LazyHero from 'react-lazy-hero';
import {Spinner, PageTitle, Particles} from '../../../components/shared';
import {ImageViewer} from '../../../components/Gallery';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import styles from './styles/Gallery.module.scss';

const Gallery = () => {
    const gallery = useStoreState(state => state.content.gallery);
    const setGallery = useStoreActions(state => state.content.setGallery);
    const [content, setContent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        if (!gallery) {
            fetchGallery();
        }
    }, [])

    useEffect(() => {
        const content = data.lang[lang].pages.gallery;
        setContent(content)
    }, [lang])

    const fetchGallery = async () => {
        try {
            const snapshot = await Api.gallery.getAll();
            let classes = [];
            snapshot.forEach(doc => {
                classes.push({...doc.data(), id: doc.id})
            });
            setGallery(classes)
        } catch (error) {
            console.log(error)
        }
    }



    const getImages = () => {
        return gallery.map((item, i) => {
            return (
                <Grid key={item.id} className={styles.image} item xs={12} sm={6} md={4} lg={3} onClick={() => setSelectedImage(item.url)}>
                    <LazyHero 
                        imageSrc={item.url} 
                        opacity={0.1}
                        style={{minHeight: '25rem'}}
                    />
                </Grid>
            )
        })
    }

    if (!gallery || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                <div className={styles.content}>
                    <Grid container spacing={4}>
                        {getImages()}
                    </Grid>
                </div>
            </div>
            {selectedImage ? (
                <ImageViewer image={selectedImage} closeHandler={() => setSelectedImage(false)} />
            ) : null}
        </>
    );
};

export default Gallery;

