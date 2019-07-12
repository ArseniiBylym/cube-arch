import React, {useState} from 'react';
import styles from './styles.module.scss';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import { styleCompose } from '../../assets/helpers';


export const Program = props => {
    const [selected, setSelected] = useState(0)
    const lang = useStoreState(state => state.lang.current);
    const {id, name, index, description, image, items} = props;

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
