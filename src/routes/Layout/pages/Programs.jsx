import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Spinner, PageTitle, Particles} from '../../../components/shared';
import {Program} from '../../../components/Programs'
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index'
import styles from './styles/Programs.module.scss';

const Programs = (props) => {
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
    useEffect(() => {
        setTimeout(() => {
            const id = props.location.search.split('=')[1];
            console.log(id)
            if (id) {
                const elem = document.getElementById(id);
                console.log(elem);
                elem.scrollIntoView();
            }
        }, 200)
    }, [])


    const getPrograms = () => {
        return (
            <div className={styles.programs}>
                {programs.map((item, index) => (
                        <Grid key={item.id} item sm={12}>
                            <Program {...item} index={index}/>
                        </Grid>
                ))}
            </div>
        )
    }

    if (!programs || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className={styles.root}>
                <PageTitle title={content.title} description={content.description} />
                {getPrograms()}
            </div>
        </>
    );
};

export default Programs;

