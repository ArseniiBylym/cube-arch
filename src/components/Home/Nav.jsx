import React from 'react';
import {useStoreState} from 'easy-peasy';
import Hidden from '@material-ui/core/Hidden';
import {data} from '../../assets/data/index';
import {Lang} from '../../components/Home';
import classNames from 'classnames';

export const Nav = ({activeLink, setActiveLink}) => {
    const lang = useStoreState(state => state.lang.current);

    const getLinks = () => {
        if (!lang) return null;
        return data.lang[lang].pages.home.nav.map(item => {
            return (
                <a
                    href={`#${item.name}`}
                    className={classNames('link', {active: activeLink === item.index || (activeLink === 1 && item.index === 0)})}
                    onClick={() => setActiveLink(item.index)}
                    key={item.index}
                >
                    {item.name}
                </a>
            );
        });
    };

    return (
        <div className="Nav">
            <Lang />
            <Hidden smDown>
                {getLinks()}
            </Hidden>
        </div>
    );
};
