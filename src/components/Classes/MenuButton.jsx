import React from 'react';
import styles from './MenuButton.module.scss';
import {IoIosList} from 'react-icons/io'
import Tooltip from '@material-ui/core/Tooltip';
import {useStoreState} from 'easy-peasy';
import { data } from './../../assets/data/index';

export const MenuButton = props => {
    
    const lang = useStoreState(state => state.lang.current);
    
    const {openMenu} = props;
    return (
        <Tooltip title={data.lang[lang].pages.classes.details.tooltip} placement="top-start" >
            <div className={styles.root} onClick={openMenu}><IoIosList /></div>
        </Tooltip>
    )
}