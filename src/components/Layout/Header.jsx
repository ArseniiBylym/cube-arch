import React, {useState} from 'react';
import {useStoreState} from 'easy-peasy';
import Drawer from '@material-ui/core/Drawer';
import {data} from '../../assets/data/index';
import {LangToggle, NavigationLink} from './../shared';
import logo from '../../assets/icons/logo.svg';
import styles from './Header.module.scss';

export const Header = React.memo(() => {
    const [drawer, setDrawer] = useState(false);
    const lang = useStoreState(state => state.lang.current);
    const links = data.lang[lang].pages.home.nav;

    const menuList = () => {
        return (
            <div 
                className={styles.sidebar} 
                onClick={() => setDrawer(false)} 
                onKeyDown={() => setDrawer(false)}
            >
                {links.map(item => {
                    return (
                        <NavigationLink key={item.name} to={item.linkUrl} className='sidebarLink'>
                            {item.name}
                        </NavigationLink>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={styles.root}>
            <div className={styles.logo} onClick={() => setDrawer(true)}>
                <img src={logo} alt=""/>
                <div className={styles.title}>Cube ARCH Club</div>
            </div>
            <LangToggle />
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                {menuList()}
            </Drawer>
        </div>
    )
});