import React, {useState} from 'react';
import styles from './styles.module.scss';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import { styleCompose } from '../../assets/helpers';


export const Program = props => {
    const [selected, setSelected] = useState(0)
    const lang = useStoreState(state => state.lang.current);
    const {id, name, index, description, image, items} = props;

    // const getProgramItems = () => {
    //     return items.map((item, i) => {
    //         const textDirectionStyle = i % 2 === 0 ? styles.ltr : styles.rtl;
    //         const selectedStyle = i === selected ? styles.selected : null;

    //         return (
    //             <Grid 
    //                 key={item.name[lang]} 
    //                 item 
    //                 onClick={() => setSelected(i)} 
    //                 className={styleCompose(styles.item, textDirectionStyle, selectedStyle)}
    //             >
    //                 <div className={styles.item__header}>{i + 1}. {item.name[lang]}</div>
    //                 <div className={styles.item__content}>{item.details[lang]}</div>
    //             </Grid>
    //         )
    //     })
    // }

    
    // const getImages = () => {
    //     return items.map((item, index) => (
    //         <div 
    //             key={item.name[lang]} 
    //             className={getImageStyle(index)} 
    //             style={{backgroundImage: `url(${item.image})`}} 
    //         />
    //     ))
    // }

    // const getImageStyle = (index) => {
    //     const isActiveStyle = index === selected ? styles.image__active : null;
    //     return styleCompose(styles.image, isActiveStyle)
    // }

    return (
        <Grid container className={styles.root} id={id} direction="row" justify="center" >
            <Grid item xs={12} sm={12} md={10}>
            <div className={styles.header}>
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
                {/* {index % 2 === 0 ? (
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
                )} */}
            </Grid>
            </Grid>
        </Grid>
    )
};
