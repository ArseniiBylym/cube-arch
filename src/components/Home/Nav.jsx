import React from 'react';
import {useStoreState} from 'easy-peasy';
import {data} from '../../data/index';
import classNames from 'classnames';

export const Nav = ({activeLink, setActiveLink}) => {
    const lang = useStoreState(state => state.lang.current);

    const getLinks = () => {
        if (!lang) return null;
        return data.lang[lang].pages.home.nav.map(item => {
            return (
                <a href={`#${item.name}`}
                    className={classNames('link', {active: activeLink === item.index})}
                    onClick={() => setActiveLink(item.index)}
                    key={item.index}
                >
                    {item.name}
                </a>
            );
        });
    };

    return <div className="Nav">{getLinks()}</div>;
};
