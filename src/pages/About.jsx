import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {IoLogoFacebook, IoLogoGoogleplus, IoLogoInstagram} from 'react-icons/io';

import {Spinner, PageTitle, Particles} from '../components/shared';
import {data} from '../assets/data/index';
import styles from './styles/modules/about.module.scss';

const About = () => {
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const content = data.lang[lang].pages.about;
        setContent(content)
    }, [lang])
    
    if (!content) return <Spinner />;
    return (
        <>
            <Particles />
            <PageTitle title={content.title} description={content.description} />
            <div className={styles.root}>
                <Grid container spacing={10} className={styles.container}>
                    {content.users.map(item => (
                        <Grid item key={item.id} xs={12} md={6} className={styles.user}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={12} className={styles.image} style={{backgroundImage: `url(${item.image})`}}/>
                                <Grid item xs={12} sm={6} md={12} className={styles.details}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.info}>{item.info}</div>
                                    <div className={styles.socials}>
                                        <a target="_blank" rel="noopener noreferrer" href={item.socials.facebook} className={styles.facebook}><IoLogoFacebook /></a>
                                        <a target="_blank" rel="noopener noreferrer" href={item.socials.google} className={styles.google}><IoLogoGoogleplus /></a>
                                        <a target="_blank" rel="noopener noreferrer" href={item.socials.instagram} className={styles.instagram}><IoLogoInstagram /></a>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default About;
