import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import LazyHero from 'react-lazy-hero';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {Api} from '../api/index';
import {data} from '../assets/data/index';
import styles from './styles/modules/gallery.module.scss';

const Gallery = () => {
    const [gallery, setGallery] = useState(null);
    const [content, setContent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const lang = useStoreState(state => state.lang.current);
    
    useEffect(() => {
        const fetchedGallery = Api.getGallery();
        setGallery(fetchedGallery)
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.gallery;
        setContent(content)
    }, [lang])



    const getImages = () => {
        return gallery.map((item, i) => {
            return (
                <Grid key={item} item xs={12} sm={6} md={4} onClick={() => setSelectedImage(item)}>
                    <LazyHero 
                        imageSrc={item} 
                        opacity={0.1}
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
                    <Grid container justify="center" spacing={4}>
                        {getImages()}
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Gallery;

