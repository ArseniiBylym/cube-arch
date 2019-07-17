import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import styles from './styles/NewGroup.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';

export const NewGroup = props => {
    const {close} = props;

    const programs = useStoreState(state => state.content.programs)
    const addGroup = useStoreActions(state => state.content.addGroup);

    const [image, setImage] = useState('');
    const [name, setName] = useState({en: '', ukr: ''});
    const [description, setDescription] = useState({en: '', ukr: ''});
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [places, setPlaces] = useState(10);
    const [program, setProgram] = useState(0);


    const onNameChange = lang => e => {
        setName({...name, [lang]: e.target.value});
    };
    const onDescriptionChange = lang => e => {
        setDescription({...description, [lang]: e.target.value});
    };

    const onCreate = async () => {
        const newGroup = {
            image,
            name,
            description,
            price,
            duration,
            places,
            startDate: new Date(startDate).getTime() + '',
            endDate: new Date(endDate).getTime() + '',
            program: {
                name: {...programs[program].name},
                id: programs[program].id
            }
        };
        try {
            const doc = await Api.groups.add(newGroup);
            addGroup({...newGroup, id: doc.id});
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>Create new group</h1>
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
                        label="Start date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                        variant="outlined"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="End date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                        variant="outlined"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={endDate}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        name="places"
                        label="Places left"
                        type="number"
                        fullWidth
                        required
                        onChange={(e) => setPlaces(+e.target.value)}
                        variant="outlined"
                        value={places}
                    />
                </Grid>
            </Grid> 
            <h3>Program</h3>
            <Grid container justify="center" >
                <Grid item xs={6}>
                    <FormControl className={styles.formControl} variant="outlined" fullWidth>
                        <Select
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                            input={<OutlinedInput name="program"  />}
                        >
                            {programs.map((item, i) => (
                                <MenuItem key={item.id} value={i}>{item.name.ukr}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3>Price</h3>
                    <TextField
                        margin="normal"
                        name="price_en"
                        label="Price"
                        type="number"
                        fullWidth
                        required
                        onChange={(e) => setPrice(+e.target.value)}
                        variant="outlined"
                        value={price}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h3>Classes amount</h3>
                    <TextField
                        margin="normal"
                        name="duration_en"
                        label="Duration"
                        type="number"
                        fullWidth
                        required
                        onChange={(e) => setDuration(+e.target.value)}
                        variant="outlined"
                        value={duration}
                    />
                </Grid>
            </Grid>
            <Grid container justify="center">
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
