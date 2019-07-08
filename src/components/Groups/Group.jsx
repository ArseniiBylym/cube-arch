import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import styles from './styles.module.scss'
import { styleCompose } from '../../helpers';
import { data } from './../../data/index';


export const Group = props => {
    const [details, setDetails] = useState(null);
    const lang = useStoreState(state => state.lang.current);
    const {id, name, startDate, duration, closed, price, description, imageUrl, programs, dir} = props;
    useEffect(() => {
        setDetails(data.lang[lang].pages.groups.details);
    }, [lang])

    const getPrograms = () => {
        return (
            <div className={styles.programList}>
                {programs.map(item => {
                    return (
                        <Link key={item.linkUrl} to={item.linkUrl}>{item.name[lang]}</Link>
                    )
                })}
            </div>
        )
    }

    if (!lang || !details) return null
    return (
        <Grid container className={styles.root} direction={dir === 'rtl' ? 'row-reverse': 'row'}>
            <Grid item sm={12} md={4} className={styles.image_container} >
                <div style={{backgroundImage: `url(${imageUrl})`}} className={styles.image}></div>
            </Grid>
            <Grid item sm={12} md={8} className={styles.content}>
                <div className={styles.title}>{name[lang]}</div>
                <div className={styleCompose(styles.row, styles.date)}>
                    <span>{details.date}</span>
                    <span>{moment(startDate).format("L")}</span>
                </div>
                <div className={styleCompose(styles.row, styles.duration)}>
                    <span>{details.duration}</span>
                    <span>{duration}</span>
                </div>
                <div className={styleCompose(styles.row, styles.price)}>
                    <span>{details.price}</span>
                    <span>&#8372; {price}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.description}>
                    {description[lang]}
                </div>
                <div className={styleCompose(styles.row, styles.programs)}>
                    <span>{details.programs}:</span>
                    {getPrograms()}
                </div>
                <div className={styles.apply_container}>
                    {closed ? (
                        <div className={styles.closed}>{details.closed}</div>
                    ) : (
                        <div className={styles.apply}>{details.apply}</div>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}