import React from 'react';
import {data} from '../../../assets/data/index';

import {IoLogoFacebook, IoLogoGoogleplus, IoLogoInstagram, IoLogoTwitter} from 'react-icons/io';
import {MdMailOutline} from 'react-icons/md'


export const ContactsScreen = props => {
    const {text, address, className} = props;
    return (
        <div className={`ContactsScreen ${className}`}>
            <div className="address" >
                {address}
            </div>
            {data.core.contacts.phones.map(item => (
                <div key={item} className="phone">
                    <p>{item}</p>
                </div>
            ))}
            <div className="email">
                <a href={`mailto:${data.core.contacts.email}`}>
                    <MdMailOutline/><p>{data.core.contacts.email}</p>
                </a>
            </div>
            <div className="socials">
                <a href={data.core.contacts.facebook} className="facebook"><IoLogoFacebook /></a>
                <a href={data.core.contacts.google} className="google"><IoLogoGoogleplus /></a>
                <a href={data.core.contacts.instagram} className="instagram"><IoLogoInstagram /></a>
                <a href={data.core.contacts.twitter} className="twitter"><IoLogoTwitter /></a>
            </div>
        </div>
    )
}