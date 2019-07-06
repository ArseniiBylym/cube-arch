import React from 'react';
import {Link} from 'react-router-dom';
import {LinkButton} from '../../shared';

export const GalleryScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`GalleryScreen ${className}`}>
            <div className="images">
                <Link to={linkUrl}><div className="image image-1" /></Link>
                <Link to={linkUrl}><div className="image image-2" /></Link>
                <Link to={linkUrl}><div className="image image-3" /></Link>
            </div>
            <div className="content">
                <div className="text">{text}</div>
                <div className="link">
                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                </div>
            </div>
        </div>
    );
};
