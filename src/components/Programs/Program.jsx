import React, {useState, useEffect} from 'react';
import styles from './styles.module.scss';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import { styleCompose } from './../../helpers';


export const Program = props => {
    const [image, setImage] = useState(null);
    const [selected, setSelected] = useState(0)
    const lang = useStoreState(state => state.lang.current);
    const {id, name, index, items} = props;

    useEffect(() => {
        setImage(items[0].image)
    }, [])
    

    const itemClickHandler = (index, image)  => e => {
        setSelected(index);
        setImage(image);
    }

    const getImageStyle = () => {
        const selected = image ? styles.image_selected : null;
        return styleCompose(styles.image, selected);
    }

    const getProgramItems = () => {
        return items.map((item, i) => {
            const textPosition = i % 2 === 0 ? styles.ltr : styles.rtl;
            const isSelected = i === selected ? styles.selected : null;
            return (
                <Grid onClick={itemClickHandler(i, item.image)} key={item.name[lang]} item className={styleCompose(styles.item, textPosition, isSelected)}>
                    <div className={styles.item__header}>{i + 1}. {item.name[lang]}</div>
                    <div className={styles.item__content}>{item.details[lang]}</div>
                </Grid>
            )
        })
    }

    return (
        <div className={styles.root} id={id}>
            <div className={styles.header}>{name[lang]}</div>
            <Grid container className={styles.container}>
                {index % 2 === 0 ? (
                    <>
                        <Grid item xs={12} md={5} className={styles.image__wrapper}>
                            <div className={getImageStyle()} style={image && {backgroundImage: `url(${image})`}} />
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
                            <div className={getImageStyle()} style={image && {backgroundImage: `url(${image})`}} />
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    )
};
