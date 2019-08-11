import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Spinner, PageTitle} from '../../../components/shared';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index'
import styles from './styles/Programs.module.scss';
import {Link} from 'react-router-dom';
import moment from 'moment';

const Programs = (props) => {
    const [content, setContent] = useState(null);
    const programs = useStoreState(state => state.content.programs);
    const setPrograms = useStoreActions(state => state.content.setPrograms);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        if(!programs) {
            fetchPrograms();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const content = data.lang[lang].pages.programs;
        setContent(content)
    }, [lang])

    const fetchPrograms = async() => {
        try {
            const snapshot = await Api.programs.getAll();
            let programs = [];
            snapshot.forEach(doc => {
                programs.push({...doc.data(), id: doc.id})
            });
            setPrograms(programs)
        } catch (error) {
            console.log(error)
        }
    }

    const getPrograms = () => {
        return (
            <Grid container spacing={6}>
                {programs.map(item => (
                    <Grid key={item.id} item xs={12} md={6} className={styles.program}>
                        <Link to={`/courses/${item.id}`}>
                        <div className={styles.program__container}>
                            <div className={styles.program__image} style={{backgroundImage: `url(${item.fileUrl || item.image})`}}>
                                <div className={styles.program__details}>{content.readMore}</div>
                            </div>
                            <div className={styles.program__info}>
                                <div className={styles.program__info__name}>{item.name[lang]}</div>
                                <div className={styles.program__info__date}>
                                    <span>{moment(+item.startDate).format("DD/MM/YYYY")} </span>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (!programs || !content) return <Spinner />;
    return (
        <div className={styles.root}>
            <PageTitle title={content.title} description={''} />
            {getPrograms()}
            {/* <div className={styles.compare}>
                <div className={styles.compare__title}>{content.compareTitle}</div>
                <img src="https://thulitables.com/wp-content/uploads/2015/10/comparison-chart-all-tables.jpg" alt='' className={styles.compare__image} />
            </div> */}
        </div>
    );
};

export default Programs;

