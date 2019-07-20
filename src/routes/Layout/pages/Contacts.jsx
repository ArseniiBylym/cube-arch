import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import {IoLogoFacebook, IoLogoGoogleplus, IoLogoInstagram, IoLogoTwitter} from 'react-icons/io';
import {MdMailOutline} from 'react-icons/md'
import {Spinner, PageTitle} from '../../../components/shared';
import {data} from '../../../assets/data/index';
import styles from './styles/Contacts.module.scss';

const Contacts = () => {
    const [content, setContent] = useState(null);

    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const content = data.lang[lang].pages.contacts;
        setContent(content)
    }, [lang])
    
    if (!content) return <Spinner />;
    return (
        <>
            <PageTitle title={content.title} description={content.description} />
            <div className={styles.root}>
                <div className={styles.address} >
                    {data.core.contacts.address[lang]}
                </div>
                {data.core.contacts.phones.map(item => (
                    <div key={item} className={styles.phone}>
                        <p>{item}</p>
                    </div>
                ))}
                <div className={styles.email}>
                    <a href={`mailto:${data.core.contacts.email}`}>
                        <MdMailOutline/><p>{data.core.contacts.email}</p>
                    </a>
                </div>
                <div className={styles.socials}>
                    <a href={data.core.contacts.facebook} className={styles.facebook}><IoLogoFacebook /></a>
                    <a href={data.core.contacts.google} className={styles.google}><IoLogoGoogleplus /></a>
                    <a href={data.core.contacts.instagram} className={styles.instagram}><IoLogoInstagram /></a>
                    <a href={data.core.contacts.twitter} className={styles.twitter}><IoLogoTwitter /></a>
                </div>
            </div>
        </>
    );
};

export default Contacts;
