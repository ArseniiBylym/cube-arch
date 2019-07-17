import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from './styles/NewTour.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';

export const NewTour = props => {
    const {close} = props;

    const addTour = useStoreActions(state => state.content.addTour);

    const [image, setImage] = useState('');
    const [name, setName] = useState({en: '', ukr: ''});
    const [place, setPlace] = useState({en: '', ukr: ''});
    const [description, setDescription] = useState({en: '', ukr: ''});
    const [price, setPrice] = useState({en: '', ukr: ''});
    const [duration, setDuration] = useState({en: '', ukr: ''});
    const [auditory, setAuditory] = useState({en: '', ukr: ''});
    const [datetime, setDatetime] = useState('');
    const [open, setOpen] = useState(true);
    const [orderable, setOrderable] = useState(false);

    const onNameChange = lang => e => {
        setName({...name, [lang]: e.target.value});
    };
    const onPlaceChange = lang => e => {
        setPlace({...place, [lang]: e.target.value});
    };
    const onDescriptionChange = lang => e => {
        setDescription({...description, [lang]: e.target.value});
    };
    const onPriceChange = lang => e => {
        setPrice({...price, [lang]: e.target.value});
    };
    const onDurationChange = lang => e => {
        setDuration({...duration, [lang]: e.target.value});
    };
    const onAuditoryChange = lang => e => {
        setAuditory({...auditory, [lang]: e.target.value});
    };

    const onCreate = async () => {
        const newTour = {
            image,
            name,
            place,
            description,
            price,
            duration,
            auditory,
            datetime: new Date(datetime).getTime() + '',
            open,
            orderable,

        };
        try {
            const doc = await Api.tours.add(newTour);
            addTour({...newTour, id: doc.id});
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>Create new tour</h1>
            <img src={image || imagePlaceholder} alt="" className={styles.image} />
            <TextField
                margin="normal"
                name="image"
                label="Image URL"
                type="text"
                fullWidth
                required
                onChange={e => setImage(e.target.value)}
                variant="outlined"
                value={image}
            />
            <h3>Options</h3>
             <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Date and time"
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => setDatetime(e.target.value)}
                        value={datetime}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                    control={
                    <Checkbox checked={open} onChange={() => setOpen(!open)} value={open} />
                    }
                    label="Registration open"
                />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                    control={
                    <Checkbox checked={orderable} onChange={() => setOrderable(!orderable)} value={orderable} />
                    }
                    label="User can order"
                />
                </Grid>
            </Grid> 
            <h3>Name</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="name_en"
                        label="Name"
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
                        label="Назва"
                        type="text"
                        fullWidth
                        required
                        onChange={onNameChange('ukr')}
                        variant="outlined"
                        value={name.ukr}
                    />
                </Grid>
            </Grid>
            <h3>Place</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="place_en"
                        label="Place"
                        type="text"
                        fullWidth
                        required
                        onChange={onPlaceChange('en')}
                        variant="outlined"
                        value={place.en}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="place_ukr"
                        label="Місце"
                        type="text"
                        fullWidth
                        required
                        onChange={onPlaceChange('ukr')}
                        variant="outlined"
                        value={place.ukr}
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
                        rows={7}
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
                        rows={7}
                    />
                </Grid>
            </Grid>
            <h3>Price</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="price_en"
                        label="Price"
                        type="text"
                        fullWidth
                        required
                        onChange={onPriceChange('en')}
                        variant="outlined"
                        value={price.en}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="name_ukr"
                        label="Ціна"
                        type="text"
                        fullWidth
                        required
                        onChange={onPriceChange('ukr')}
                        variant="outlined"
                        value={price.ukr}
                    />
                </Grid>
            </Grid>
            <h3>Duration</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="duration_en"
                        label="Duration"
                        type="text"
                        fullWidth
                        required
                        onChange={onDurationChange('en')}
                        variant="outlined"
                        value={duration.en}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="duration_ukr"
                        label="Тривалість"
                        type="text"
                        fullWidth
                        required
                        onChange={onDurationChange('ukr')}
                        variant="outlined"
                        value={duration.ukr}
                    />
                </Grid>
            </Grid>
            <h3>Auditory</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="auditory_en"
                        label="Auditory"
                        type="text"
                        fullWidth
                        required
                        onChange={onAuditoryChange('en')}
                        variant="outlined"
                        value={auditory.en}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="auditory_ukr"
                        label="Аудиторія"
                        type="text"
                        fullWidth
                        required
                        onChange={onAuditoryChange('ukr')}
                        variant="outlined"
                        value={auditory.ukr}
                    />
                </Grid>
            </Grid>
            <div className={styles.buttons}>
                <Button onClick={onCreate} color="secondary" variant="contained" size="large">
                    Create
                </Button>
                <Button onClick={() => close()} color="primary" variant="contained" size="large">
                    Close
                </Button>
            </div>
        </div>
    );
};
