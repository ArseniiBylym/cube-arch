import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import styles from './Classes.module.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import { NewClass, EditClass } from './../components';
import { Api } from './../../../api/index';
import { Spinner } from './../../shared/Spinner';

export const Classes = props => {
    const classes = useStoreState(state => state.content.classes);
    const setClasses = useStoreActions(state => state.content.setClasses);
    const deleteClass = useStoreActions(state => state.content.deleteClass);

    const [createMode, setCreateMode] = useState(false);
    const [edited, setEdited] = useState(null);

    useEffect(() => {
        if (!classes) {
            fetchData();
        }
    }, [])

    const fetchData = async() => {
        try {
            const snapshot = await Api.classes.getAll();
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setClasses(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = async (id) => {
        try {
            await Api.classes.delete(id);
            deleteClass(id) 
        } catch (error) {
            console.log(error)
        }
    }

    const itemsList = () => {
        return classes.map(item => (
            <div key={item.id} className={styles.card}>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={styles.card__image} style={{backgroundImage: `url(${item.image})`}}/>
                    </Grid>
                    <Grid item xs={8} className={styles.card__content}>
                        <h2>{item.name['ukr']}</h2>
                        <div className={styles.card__datetime}>
                            <div className={styles.date}>{moment(+item.datetime).format("DD-MM-YYYY")}</div>
                            <div className={styles.time}>{moment(+item.datetime).format("HH:mm")}</div>
                        </div>
                        <div className={styles.card__place}>{item.place.ukr}</div>
                        <div className={styles.card__price}>{item.price.ukr}</div>
                        <div className={styles.card__buttons}> 
                            <Button className={styles.editButton} size="large" color="secondary" variant="contained" onClick={() => setEdited(item)}>Edit</Button>
                            <Button className={styles.deleteButton} size="large" color="primary" variant="contained" onClick={() => deleteHandler(item.id)}>Delete</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        ))
    }

    if (!classes) return <Spinner />
    return (
        <div className={styles.root}>
            {createMode && (
                <NewClass close={() => setCreateMode(false)} />
            )}
            {edited && (
                <EditClass close={() => setEdited(null)} editedClass={edited} />
            )}
            {!createMode && !edited && (
                <>
                    <h1>Classes list</h1>
                    <div className={styles.classes}>
                        {itemsList()}
                    </div>
                    <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setCreateMode(true)}>Create class</Button>
                </>
            )}
        </div>
    )
};
