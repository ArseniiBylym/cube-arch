import React from 'react';
import { LinkButton } from '../../shared';
import {data} from '../../../data/index';
import {IoLogoFacebook, IoLogoGoogleplus, IoLogoInstagram, IoLogoTwitter} from 'react-icons/io';

export const AboutScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`AboutScreen ${className}`}>
            <div className="image" />
            <div className="content">
                <div className="text">{text}</div>
                <div className="link">
                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                </div>
            <div className="footer">
                <a href={data.core.contacts.facebook} className="facebook"><IoLogoFacebook /></a>
                <a href={data.core.contacts.google} className="google"><IoLogoGoogleplus /></a>
                <a href={data.core.contacts.instagram} className="instagram"><IoLogoInstagram /></a>
                <a href={data.core.contacts.twitter} className="twitter"><IoLogoTwitter /></a>
            </div>
            </div>
        </div>
    )
}