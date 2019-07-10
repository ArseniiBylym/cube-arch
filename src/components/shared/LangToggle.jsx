import React from 'react';
import classNames from 'classnames';
import {useStoreState, useStoreActions} from 'easy-peasy';
import styles from './LangToggle.module.scss';

export const LangToggle = props => {
    const lang = useStoreState(state => state.lang.current);
    const toggleLang = useStoreActions(actions => actions.lang.toggle)

    return (
        <div className={styles.root}>
            <div className={styles.fontPreloader}>test/тест</div>
            <span onClick={() => toggleLang('ukr')} className={classNames({[styles.active]: lang === 'ukr'})}>UKR</span>
            /
            <span onClick={() => toggleLang('en')} className={classNames({[styles.active]: lang === 'en'})}>EN</span>
        </div>
    )
}