import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import styles from './styles.module.scss'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import {ManageTourForm} from './../components';
import { Api } from './../../../api/index';
import { Spinner } from './../../shared/Spinner';

export const Tours = props => {
    const tours = useStoreState(state => state.content.tours);
    const setTours = useStoreActions(state => state.content.setTours);
    const deleteTour = useStoreActions(state => state.content.deleteTour);

    const [createMode, setCreateMode] = useState(false);
    const [edited, setEdited] = useState(null);

    useEffect(() => {
        if (!tours) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async() => {
        try {
            const snapshot = await Api.tours.getAll();
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setTours(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteHandler = async item => {
        const {id, fileName} = item;
        try {
            if (fileName) {
                await Api.tours.deleteFile(fileName)
            }
            await Api.tours.delete(id);
            deleteTour(id) 
        } catch (error) {
            console.log(error)
        }
    }

    const itemsList = () => {
        return tours.map(item => (
            <div key={item.id} className={styles.card}>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={styles.card__image} style={{backgroundImage: `url(${item.fileUrl || item.image})`}}/>
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
                            <Button className={styles.deleteButton} size="large" color="primary" variant="contained" onClick={() => deleteHandler(item)}>Delete</Button>
                        </div>
                    </Grid>
                   
                </Grid>
            </div>
        ))
    }

    if (!tours) return <Spinner />
    return (
        <div className={styles.root}>
            {(createMode || edited) && <ManageTourForm 
                close={createMode ? () => setCreateMode(false) : () => setEdited(null)}
                editedElem={edited}    
            />}
            {!createMode && !edited && (
                <>
                    <h1>Tours list</h1>
                    <div className={styles.classes}>
                        {itemsList()}
                    </div>
                    <Button className={styles.createButton} size="large" color="secondary" variant="contained" onClick={() => setCreateMode(true)}>Create new</Button>
                </>
            )}
        </div>
    )
};
