import React, {useState, useEffect} from 'react';
import styles from './styles/ProgramDetails.module.scss';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index';
import {Spinner} from './../../../components/shared';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { ProgramRegisterModal } from './../../../components/modals';

const ProgramDetails = props => {
    const [registerModal, setRegisterModal] = useState(false);
    const [content, setContent] = useState(null);
    const programs = useStoreState(state => state.content.programs);
    const lang = useStoreState(state => state.lang.current);
    const [program, setProgram] = useState(null);

    useEffect(() => {
        if (!programs) {
            fetchCurrentProgram();
        } else {
            const programId = props.match.params.id;
            const program = programs.find(item => item.id === programId);
            setProgram(program);
        }
    }, [props.match.params.id]);

    useEffect(() => {
        const content = data.lang[lang].pages.programs;
        setContent(content);
    }, [lang]);
    useEffect(() => {
        console.log(program);
    });

    const fetchCurrentProgram = async () => {
        try {
            const doc = await Api.programs.getProgram(props.match.params.id);
            if (doc.exists) {
                setProgram({...doc.data(), id: doc.id});
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!content || !program) return <Spinner />;
    return (
        <>
        <div className={styles.root}>
            <div className={styles.title}>{program.name[lang]}</div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className={styles.image__wrapper}>
                    <div
                        className={styles.image__content}
                        style={{backgroundImage: `url(${program.image}`}}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    className={styles.info}
                    container
                    direction="column"
                    justify="space-between"
                >
                    <div className={styles.info__startDate}>
                        <div>{content.details.startDate}</div>
                        <div>{moment(+program.startDate).format('DD-MM-YYYY')}</div>
                    </div>
                    <div className={styles.info__endDate}>
                        <div>{content.details.endDate}</div>
                        <div>{moment(+program.endDate).format('DD-MM-YYYY')}</div>
                    </div>
                    <div className={styles.info__duration}>
                        <div>{content.details.duration}</div>
                        <div>{program.duration}</div>
                    </div>
                    <div className={styles.info__places}>
                        <div>{content.details.places}</div>
                        <div>{program.places}</div>
                    </div>
                    <div className={styles.info__price}>
                        <div>{content.details.price}</div>
                        <div>&#8372; {program.price}</div>
                    </div>
                    <div className={styles.register}>
                        {+program.places > 0 ? (
                            <div
                                onClick={() => setRegisterModal(true)}
                                className={styles.register__open}
                            >
                                {content.details.apply}
                            </div>
                        ) : (
                            <div className={styles.register__closed}>{content.details.closed}</div>
                        )}
                    </div>
                </Grid>
                <Grid item xs={12} className={styles.description}>
                    <div className={styles.description__title}>{content.details.description}</div>
                    <div className={styles.description__content}><pre>{program.description[lang]}</pre></div>
                </Grid>
            </Grid>
        </div>
        <ProgramRegisterModal open={registerModal} closeModal={() => setRegisterModal(false)} {...{eventId: program.id, eventName: program.name, startDate: program.startDate, endDate: program.endDate}}/>
        </>
    );
};

export default ProgramDetails;
