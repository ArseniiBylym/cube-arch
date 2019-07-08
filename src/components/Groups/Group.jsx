import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import styles from './styles.module.scss'
import { styleCompose } from '../../helpers';
import { data } from './../../data/index';

export const Group = props => {
    const [details, setDetails] = useState(null);
    const lang = useStoreState(state => state.lang.current);
    const {id, name, startDate, endDate, places, price, description, imageUrl, program, dir} = props;
    useEffect(() => {
        setDetails(data.lang[lang].pages.groups.details);
    }, [lang])

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
                    <span>{moment(startDate).format("DD/MM")} - {moment(endDate).format("L")}</span>
                </div>
                <div className={styleCompose(styles.row, styles.places)}>
                    <span>{details.places}</span>
                    <span>{places}</span>
                </div>
                <div className={styleCompose(styles.row, styles.price)}>
                    <span>{details.price}</span>
                    <span>&#8372; {price}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.description}>
                    {description[lang]}
                </div>
                <div className={styleCompose(styles.row, styles.program)}>
                    <span>{details.program.title}:</span>
                    <Tooltip title={details.program.tooltip} aria-label={details.program.tooltip} placement="top-start" enterDelay={300}>
                        <Link to={program.linkUrl}>{program.name[lang]}</Link>
                    </Tooltip>
                </div>
                <div className={styles.apply_container}>
                    {places === 0 ? (
                        <div className={styles.closed}>{details.closed}</div>
                    ) : (
                        <div className={styles.apply}>{details.apply}</div>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}