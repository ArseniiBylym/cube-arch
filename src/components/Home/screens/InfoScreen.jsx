import React from 'react';
import './styles.scss';

export const InfoScreen = props => {
    const {text} = props;
    return (
        <div className="InfoScreen">
            <div className="text">{text}</div>
        </div>
    );
};
