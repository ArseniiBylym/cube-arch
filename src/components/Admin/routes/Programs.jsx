import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import styles from './styles.module.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { NewProgram, EditProgram } from './../components';
import { Api } from './../../../api/index';
import { Spinner } from './../../shared/Spinner';

export const Programs = props => {
    const programs = useStoreState(state => state.content.programs);
    const setPrograms = useStoreActions(state => state.content.setPrograms);
    const deleteProgram = useStoreActions(state => state.content.deleteProgram);

    const [createMode, setCreateMode] = useState(false);
    const [editedProgram, setEditedProgram] = useState(null);

    useEffect(() => {
        if (!programs) {
            fetchPrograms();
        }
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

    const deleteHandler = async (id) => {
        try {
            await Api.programs.delete(id);
            deleteProgram(id) 
        } catch (error) {
            console.log(error)
        }
    }


    const programList = () => {
        return programs.map(item => (
            <div key={item.id} className={styles.card}>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={styles.card__image} style={{backgroundImage: `url(${item.image})`}}/>
                    </Grid>
                    <Grid item xs={8} className={styles.card__content}>
                        <h1>{item.name['ukr']}</h1>
                        <p>{item.description['ukr']}</p>
                        <div className={styles.card__buttons}> 
                            <Button className={styles.editButton} size="large" color="secondary" variant="contained" onClick={() => setEditedProgram(item)}>Edit</Button>
                            <Button className={styles.deleteButton} size="large" color="primary" variant="contained" onClick={() => deleteHandler(item.id)}>Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        ))
    }

    if (!programs) return <Spinner />
    return (
        <div className={styles.root}>
            {createMode && (
                <NewProgram close={() => setCreateMode(false)} />
            )}
            {editedProgram && (
                <EditProgram close={() => setEditedProgram(null)} program={editedProgram} />
            )}
            {!createMode && !editedProgram && (
                <>
                    <h1>Programs list</h1>
                    <div className={styles.list}>
                        {programList()}
                    </div>
                    <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setCreateMode(true)}>Create new</Button>
                </>
            )}
        </div>
    )
};
