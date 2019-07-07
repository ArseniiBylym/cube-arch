import React from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import './styles.scss';


export const Group = props => {
    const lang = useStoreState(state => state.lang.current);
    const {id, name, startDate, duration, available, price, description, imageUrl, programs, dir} = props;


    if (!lang) return null
    return (
        <Grid container className="Group" direction={dir == 'rtl' ? 'row-reverse': 'row'}>
            <Grid item sm={12} md={4} className="Group__image" >
                <div style={{backgroundImage: `url(${imageUrl})`}} className="Group__image__content"></div>
            </Grid>
            <Grid item sm={12} md={8} className="Group__content">
                <div className="Group__content__title">{name[lang]}</div>
            </Grid>
        </Grid>
    )
}