import React from 'react';
import { LinkButton } from '../../shared';

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
            </div>
        </div>
    )
}