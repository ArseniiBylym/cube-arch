import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {IoLogoFacebook} from 'react-icons/io';
import {Spinner, PageTitle} from '../../../components/shared';
import {data} from '../../../assets/data/index';
import styles from './styles/About.module.scss';

const About = () => {
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const content = data.lang[lang].pages.about;
        setContent(content);
    }, [lang]);

    if (!content) return <Spinner />;
    return (
        <>
            <PageTitle title={content.title} />
            <div className={styles.root}>
                <Grid container spacing={0} className={styles.container}>
                    {content.users.map(item => (
                        <Grid item key={item.id} xs={12} className={styles.user}>
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    className={styles.image}
                                    style={{backgroundImage: `url(${item.image})`}}
                                />
                                <Grid item xs={12} className={styles.details}>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.info}>{item.info}</div>
                                    <div className={styles.socials}>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={`https://www.${item.socials.facebook}`}
                                            className={styles.facebook}
                                        >
                                            <IoLogoFacebook />
                                        </a>
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
