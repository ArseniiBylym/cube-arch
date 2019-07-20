import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Spinner, PageTitle} from '../../../components/shared';
import {Program} from '../../../components/Programs'
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index'
import styles from './styles/Programs.module.scss';

const Programs = (props) => {
    const [content, setContent] = useState(null);
    const programs = useStoreState(state => state.content.programs);
    const setPrograms = useStoreActions(state => state.content.setPrograms);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        if(!programs) {
            fetchPrograms();
        }
    }, [])

    useEffect(() => {
        const content = data.lang[lang].pages.programs;
        setContent(content)
    }, [lang])

    useEffect(() => {
        setTimeout(() => {
            const id = props.location.search.split('=')[1];
            if (id) {
                const elem = document.getElementById(id);
                elem.scrollIntoView();
            }
        }, 200)
    }, [])

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
        <div className={styles.root}>
            <PageTitle title={content.title} description={content.description} />
            {getPrograms()}
        </div>
    );
};

export default Programs;

