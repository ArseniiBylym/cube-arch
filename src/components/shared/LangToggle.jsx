import React from 'react';
import classNames from 'classnames';
import {useStoreState, useStoreActions} from 'easy-peasy';

import './styles.scss';

export const LangToggle = props => {
    const lang = useStoreState(state => state.lang.current);
    const toggleLang = useStoreActions(actions => actions.lang.toggle)

    return (
        <div className="LangToggle">
            <div className="fontLoader">test/тест</div>
            <span onClick={() => toggleLang('ukr')} className={classNames({active: lang === 'ukr'})}>UKR</span>
            /
            <span onClick={() => toggleLang('en')} className={classNames({active: lang === 'en'})}>EN</span>
        </div>
    )
}