import React, {useState, useEffect} from 'react'
import {useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './styles/NewProgram.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import { Api } from './../../../api';

export const EditProgram = props => {
    const {close, program} = props;

    const updateProgram = useStoreActions(state => state.content.updateProgram);

    const [image, setImage] = useState('');
    const [name, setName] = useState({en: '', ukr: ''})
    const [description, setDescription] = useState({en: '', ukr: ''})

    useEffect(() => {
        setImage(program.image);
        setName(program.name);
        setDescription(program.description);
    }, [])

    const onNameChange = lang => e => {
        setName({...name, [lang]: e.target.value})
    }

    const onDescriptionChange = lang => e => {
        setDescription({...description, [lang]: e.target.value})
    }

    const onUpdate = async() => {
        const updatedProgram = {
            image,
            name, 
            description,
            createdAt: Date.now() + '',
        }
        try {
            await Api.programs.update({id: program.id, updatedProgram});
            updateProgram({...updatedProgram, id: program.id})
        } catch(error) {
            console.log(error)
        } finally {
            close()
        }
    }

    return (
        <div className={styles.root}>
           <h1>Update program</h1>
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
           <h5>Name</h5>
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
            <h5>Description</h5>
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
                <div className={styles.buttons}>
                    <Button onClick={onUpdate} color="secondary" variant="contained" size="large">Update</Button>
                    <Button onClick={() => close()} color="primary" variant="contained" size="large">Close</Button>
                </div>
        </div>
    )
};
