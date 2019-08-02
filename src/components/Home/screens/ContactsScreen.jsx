import React, {useState} from 'react';
import {data} from '../../../assets/data/index';
import {IoLogoFacebook, IoLogoGoogleplus, IoLogoInstagram, IoLogoTwitter} from 'react-icons/io';
import {MdMailOutline} from 'react-icons/md';
import VisibilitySensor from 'react-visibility-sensor';

export const ContactsScreen = props => {

    const {address} = props;
    const {phones, email, facebook, development} = data.core.contacts;
    return (
        <div className={`ContactsScreen`}>
            <div className="address">{address}</div>
            {phones.map(item => (
                <div key={item} className="phone">
                    {item}
                </div>
            ))}
            <div className="email">
                <a href={`mailto:${email}`}>
                    <MdMailOutline />
                    <p>{email}</p>
                </a>
            </div>
            <div className="socials">
                <a href={`https://www.${facebook}`} target="_blank" rel="noopener noreferrer" >
                    <IoLogoFacebook /><p>{facebook}</p>
                </a>
            </div>
            <div className="development">
                <div className="copyright">
                    &#169; {new Date().getFullYear()} All rights reserved
                </div>
                <div className="devInfo">
                    <span>Developed by </span>
                    <a href={`mailto:${development.email}`}>{development.name}</a>
                </div>
            </div>
        </div>
    );
};
