import React from 'react';
import styles from './Program.module.scss';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';


export const Program = props => {
    const lang = useStoreState(state => state.lang.current);
    const {id, name, description, image} = props;

    return (
        <Grid container className={styles.root} id={id} direction="row" justify="center" >
            <Grid item xs={12} sm={12} md={10}>
            <div  className={styles.header}>
                {name[lang]}
            </div>
            <Grid container className={styles.container}>
                <Grid item xs={12} className={styles.image__wrapper}>
                    <div 
                        key={name[lang]} 
                        className={styles.image} 
                        style={{backgroundImage: `url(${image})`}} 
                    />
                </Grid>
                <Grid item xs={12} className={styles.content}>
                    <pre>{description[lang]}</pre>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
};
