import React, {useState} from 'react';
import styles from './styles.module.scss';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import { styleCompose } from '../../assets/helpers';


export const Program = props => {
    const [selected, setSelected] = useState(0)
    const lang = useStoreState(state => state.lang.current);
    const {id, name, index, items} = props;

    const getProgramItems = () => {
        return items.map((item, i) => {
            const textDirectionStyle = i % 2 === 0 ? styles.ltr : styles.rtl;
            const selectedStyle = i === selected ? styles.selected : null;

            return (
                <Grid 
                    key={item.name[lang]} 
                    item 
                    onClick={() => setSelected(i)} 
                    className={styleCompose(styles.item, textDirectionStyle, selectedStyle)}
                >
                    <div className={styles.item__header}>{i + 1}. {item.name[lang]}</div>
                    <div className={styles.item__content}>{item.details[lang]}</div>
                </Grid>
            )
        })
    }

    
    const getImages = () => {
        return items.map((item, index) => (
            <div 
                key={item.name[lang]} 
                className={getImageStyle(index)} 
                style={{backgroundImage: `url(${item.image})`}} 
            />
        ))
    }

    const getImageStyle = (index) => {
        const isActiveStyle = index === selected ? styles.image__active : null;
        return styleCompose(styles.image, isActiveStyle)
    }

    return (
        <div className={styles.root} id={id}>
            <div className={styles.header}>
                {name[lang]}
            </div>
            <Grid container className={styles.container}>
                {index % 2 === 0 ? (
                    <>
                        <Grid item xs={12} md={5} className={styles.image__wrapper}>
                            {getImages()}
                        </Grid>
                        <Grid item xs={12} md={7} className={styles.content} container>
                            {getProgramItems()}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid item xs={12} md={7} className={styles.content} container>
                            {getProgramItems()}
                        </Grid>
                        <Grid item xs={12} md={5} className={styles.image__wrapper}>
                            {getImages()}
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    )
};
