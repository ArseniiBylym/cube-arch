import React from 'react';
import { LangToggle } from './../shared/LangToggle';
import './styles.scss';

export const Lang = props => {
    return (
        <div className="Lang">
            <div className="fontLoader">test/тест</div>
            <LangToggle />
        </div>
    )
}