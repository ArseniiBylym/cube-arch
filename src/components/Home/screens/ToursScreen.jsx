import React from 'react';
import { LinkButton } from '../../shared';
import {Link} from 'react-router-dom';

export const ToursScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`ToursScreen ${className}`}>
            <Link to={linkUrl} className="image" />
            <div className="content">
                <div className="text">{text}</div>
                <div className="link">
                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                </div>
            </div>
        </div>
    )
}