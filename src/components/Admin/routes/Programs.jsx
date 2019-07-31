import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import styles from './styles.module.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {ManageProgramForm} from './../components';
import { Api } from './../../../api/index';
import moment from 'moment';
import { Spinner } from './../../shared/Spinner';

export const Programs = props => {
    const programs = useStoreState(state => state.content.programs);
    const setPrograms = useStoreActions(state => state.content.setPrograms);
    const deleteProgram = useStoreActions(state => state.content.deleteProgram);

    const [createMode, setCreateMode] = useState(false);
    const [edited, setEdited] = useState(null);

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

    const deleteHandler = async item => {
        const {id, fileName} = item;
        try {
            if (fileName) {
                await Api.programs.deleteFile(fileName)
            }
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
                        <div className={styles.card__image} style={{backgroundImage: `url(${item.fileUrl || item.image})`}}/>
                    </Grid>
                    <Grid item xs={2}>
                        <h2>{item.name['ukr']}</h2>
                    </Grid>
                    <Grid item xs={6} className={styles.card__content}>
                        <div className={styles.date}>Start date: {moment(+item.startDate).format("DD-MM-YYYY")}</div>
                        <div className={styles.time}>End date: {moment(+item.endDate).format("DD-MM-YYYY")}</div>
                        <div className={styles.card__price}>Price: {item.price}</div>
                        <div className={styles.card__places}>Places left: {item.places}</div>
                        <div className={styles.card__classes}>Classes amount: {item.duration}</div>
                        <div className={styles.card__buttons}> 
                            <Button className={styles.editButton} size="large" color="secondary" variant="contained" onClick={() => setEdited(item)}>Edit</Button>
                            <Button className={styles.deleteButton} size="large" color="primary" variant="contained" onClick={() => deleteHandler(item)}>Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        ))
    }

    if (!programs) return <Spinner />
    return (
        <div className={styles.root}>
            {(createMode || edited) && <ManageProgramForm 
                close={createMode ? () => setCreateMode(false) : () => setEdited(null)}
                editedElem={edited}    
            />}
            {!createMode && !edited && (
                <>
                    <h1>Courses list</h1>
                    <div className={styles.list}>
                        {programList()}
                    </div>
                    <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setCreateMode(true)}>Create new</Button>
                </>
            )}
        </div>
    )
};
