import React, {useState} from 'react';
import {useStoreState} from 'easy-peasy';
import {NavLink} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import { LangToggle } from './../shared';
import logo from '../../assets/icons/logo.svg';
import './styles.scss';
import { data } from './../../data/index';

export const Header = props => {
    const [drawer, setDrawer] = useState(false);
    const lang = useStoreState(state => state.lang.current);
    const links = data.lang[lang].pages.home.nav;

    const menuList = () => {
        return (
            <div 
                className="sidebarMenu" 
                onClick={() => setDrawer(false)} 
                onKeyDown={() => setDrawer(false)}
            >
                {links.map(item => {
                    return (
                        <NavLink key={item.name} to={item.linkUrl} className="link">{item.name}</NavLink>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="Header">
            <div className="logo" onClick={() => setDrawer(true)}>
                <img src={logo} alt=""/>
                <h3>Cube ARCH Club</h3>
            </div>
            <div className="lang">
                <LangToggle />
            </div>
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                {menuList()}
            </Drawer>
        </div>
    )
}