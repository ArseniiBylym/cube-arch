import React, {useState} from 'react';
import {data} from '../../../assets/data/index';
import {IoLogoFacebook, IoLogoGoogleplus, IoLogoInstagram, IoLogoTwitter} from 'react-icons/io';
import {MdMailOutline} from 'react-icons/md';
import VisibilitySensor from 'react-visibility-sensor';

export const ContactsScreen = props => {
    const {address} = props;
    const {phones, email, facebook, google, instagram, twitter, development} = data.core.contacts;
    return (
        <div className={`ContactsScreen`}>
            <div className="address">{address}</div>
            {phones.map(item => (
                <div key={item} className="phone">
                    <p>{item}</p>
                </div>
            ))}
            <div className="email">
                <a href={`mailto:${email}`}>
                    <MdMailOutline />
                    <p>{email}</p>
                </a>
            </div>
            <VisibilitySensor
                partialVisibility={true}
                // active={!visible}
                // onChange={isVisible => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <div className={isVisible ? "socials visible" : "socials"}>
                        <a href={facebook} className="facebook">
                            <IoLogoFacebook />
                        </a>
                        <a href={google} className="google">
                            <IoLogoGoogleplus />
                        </a>
                        <a href={instagram} className="instagram">
                            <IoLogoInstagram />
                        </a>
                        <a href={twitter} className="twitter">
                            <IoLogoTwitter />
                        </a>
                    </div>
                )}
            </VisibilitySensor>
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
