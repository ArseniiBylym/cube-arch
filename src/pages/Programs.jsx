import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import {Spinner, DetailsPageHeader} from '../components/shared';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Program} from '../components/Programs'
import {Particles} from '../components/shared'


import { Api } from '../api/index';
import {data} from '../data/index'

import './styles.scss';
import styles from './styles/programs.module.scss';

const Programs = () => {
    const [programs, setPrograms] = useState(null);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const fetchedPrograms = Api.getPrograms();
        setPrograms(fetchedPrograms)
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.programs;
        setContent(content)
    }, [lang])


    const getPrograms = () => {
        return programs.map((item, index) => (
                <Grid key={item.id} item sm={12}>
                    <Program {...item} index={index}/>
                </Grid>
            ))
    }


    if (!programs || !content) return <Spinner />;
    return (
        <>
        <Particles />
        <div className="PageDetails Programs">
            <DetailsPageHeader title={content.title} description={content.description} />
            <div className={styles.programs}>{getPrograms()}</div>
        </div>
        </>
    );
};

export default Programs;

