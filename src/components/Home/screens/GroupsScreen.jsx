import React from 'react';
import {Link} from 'react-router-dom';
import { LinkButton } from '../../shared';

export const GroupsScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`GroupsScreen ${className}`}>
            <div className="image">
                <div className="content"></div>
            </div>
            <div className="text">
                <div className="content">{text}</div>
                <div className="button">
                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                </div>
            </div>
        </div>
    )
}