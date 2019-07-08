import React from 'react';
import { LinkButton } from '../../shared';

export const ContactsScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`ContactsScreen ${className}`}>
            <div className="image" />
            <div className="content">
                <div className="text">{text}</div>
                <div className="link">
                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                </div>
            </div>
        </div>
    )
}