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
    const {address, phones, email, facebook, google, instagram, twitter, development} = data.core.contacts;

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
                    {address[lang]}
                </div>
                {phones.map(item => (
                    <div key={item} className={styles.phone}>
                        <p>{item}</p>
                    </div>
                ))}
                <div className={styles.email}>
                    <a href={`mailto:${email}`}>
                        <MdMailOutline/><p>{email}</p>
                    </a>
                </div>
                <div className={styles.socials}>
                    <a href={facebook} className={styles.facebook}><IoLogoFacebook /></a>
                    <a href={google} className={styles.google}><IoLogoGoogleplus /></a>
                    <a href={instagram} className={styles.instagram}><IoLogoInstagram /></a>
                    <a href={twitter} className={styles.twitter}><IoLogoTwitter /></a>
                </div>
                <div className={styles.development}>
                    <div className={styles.copyright}>&#169; {new Date().getFullYear()} All rights reserved</div>
                    <div className={styles.devInfo}>
                        <span>Developed by </span><a href={`mailto:${development.email}`}>{development.name}</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;
