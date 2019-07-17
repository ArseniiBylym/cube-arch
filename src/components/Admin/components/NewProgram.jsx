import React, {useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from './styles/NewProgram.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import { Api } from './../../../api';

export const NewProgram = props => {
    const {close} = props;

    const addProgram = useStoreActions(state => state.content.addProgram);

    const [image, setImage] = useState('');
    const [name, setName] = useState({en: '', ukr: ''})
    const [description, setDescription] = useState({en: '', ukr: ''})

    const onNameChange = lang => e => {
        setName({...name, [lang]: e.target.value})
    }

    const onDescriptionChange = lang => e => {
        setDescription({...description, [lang]: e.target.value})
    }

    const onCreate = async() => {
        const newProgram = {
            image,
            name, 
            description,
            createdAt: Date.now() + '',
        }
        try {
            const doc = await Api.programs.add(newProgram);
            addProgram({...newProgram, id: doc.id})

        } catch(error) {
            console.log(error)
        } finally {
            close()
        }
    }

    return (
        <div className={styles.root}>
           <h1>Create new program</h1>
           <img src={image || imagePlaceholder} alt="" className={styles.image} />
           <TextField
                    margin="normal"
                    name="image"
                    label="Image URL"
                    type="text"
                    fullWidth
                    required
                    onChange={(e) => setImage(e.target.value)}
                    variant="outlined"
                    value={image}
                />
           <h3>Name</h3>
           <Grid container spacing={2}>
               <Grid item xs={6}>
                <TextField
                        margin="normal"
                        name="name_en"
                        label="Program Name"
                        type="text"
                        fullWidth
                        required
                        onChange={onNameChange('en')}
                        variant="outlined"
                        value={name.en}
                    />
               </Grid>
               <Grid item xs={6}>
                <TextField
                        margin="normal"
                        name="name_ukr"
                        label="Назва програми"
                        type="text"
                        fullWidth
                        required
                        onChange={onNameChange('ukr')}
                        variant="outlined"
                        value={name.ukr}
                    />
               </Grid>
           </Grid>
            <h3>Description</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="description_en"
                        label="Description"
                        type="text"
                        fullWidth
                        required
                        onChange={onDescriptionChange('en')}
                        variant="outlined"
                        value={description.en}
                        multiline
                        rows={5}
                    />
                </Grid>
                <Grid item xs={6}> 
                    <TextField
                        margin="normal"
                        name="description_ukr"
                        label="Опис"
                        type="text"
                        fullWidth
                        required
                        onChange={onDescriptionChange('ukr')}
                        variant="outlined"
                        value={description.ukr}
                        multiline
                        rows={5}
                    />
                </Grid>
            </Grid>
            <div className={styles.buttons}>
                <Button onClick={onCreate} color="secondary" variant="contained" size="large">Create</Button>
                <Button onClick={() => close()} color="primary" variant="contained" size="large">Close</Button>
            </div>
        </div>
    )
};
