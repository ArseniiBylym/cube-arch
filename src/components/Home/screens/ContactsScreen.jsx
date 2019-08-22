import React from 'react';
import {data} from '../../../assets/data/index';
import {IoLogoFacebook} from 'react-icons/io';
import {MdMailOutline} from 'react-icons/md';
import VisibilitySensor from 'react-visibility-sensor';

export const ContactsScreen = props => {
    const {address} = props;
    const {phones, email, facebook, development} = data.core.contacts;
    return (
        <VisibilitySensor
            partialVisibility={true}
            offset={{top: 0, bottom: 300}}
        >
            {({isVisible}) => (
                <div className={isVisible ? 'ContactsScreen visible' : 'ContactsScreen'}>
                    {address.map(item => (
                        <div className="address">{item}</div>
                    ))}
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
                        <a
                            href={`https://www.${facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IoLogoFacebook />
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
            )}
        </VisibilitySensor>
    );
};
