import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styles from './styles.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';
import {MdExpandMore} from 'react-icons/md'

export const EditGroup = props => {
    const {close, editedElem} = props;
    const [registeredUsers, setRegisteredUsers] = useState([])

    const programs = useStoreState(state => state.content.programs)
    const updateGroup = useStoreActions(state => state.content.updateGroup);

    const [image, setImage] = useState('');
    const [name, setName] = useState({en: '', ukr: ''});
    const [description, setDescription] = useState({en: '', ukr: ''});
    const [price, setPrice] = useState({en: '', ukr: ''});
    const [duration, setDuration] = useState({en: '', ukr: ''});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [places, setPlaces] = useState(10);
    const [program, setProgram] = useState(0);

    useEffect(() => {
        getRegistrations();
    }, [])

    useEffect(() => {
        setImage(editedElem.image);
        setName(editedElem.name);
        setDescription(editedElem.description);
        setPrice(editedElem.price);
        setDuration(editedElem.duration);
        setStartDate(moment(+editedElem.startDate).format("YYYY-MM-DD"))
        setEndDate(moment(+editedElem.endDate).format("YYYY-MM-DD"))
        setPlaces(editedElem.places);
        setProgram(programs.findIndex(item => item.id === editedElem.program.id))
    }, [])

    const onNameChange = lang => e => {
        setName({...name, [lang]: e.target.value});
    };
    const onDescriptionChange = lang => e => {
        setDescription({...description, [lang]: e.target.value});
    };


    const getRegistrations = async() => {
        try {
            const snapshot = await Api.groups.getRegisteredUsers(editedElem.id);
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setRegisteredUsers(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRegisteredUser = async (userId) => {
        try {
            await Api.groups.removeRegisteredUser(editedElem.id, userId);
            const updatedUsers = registeredUsers.filter(item => item.id !== userId);
            setRegisteredUsers(updatedUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdate = async () => {
        const updatedDoc = {
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
            await Api.groups.update({id: editedElem.id, updatedDoc});
            updateGroup({...updatedDoc, id: editedElem.id});
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>Edit group</h1>
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
                <Button onClick={onUpdate} color="secondary" variant="contained" size="large">
                    Update
                </Button>
                <Button onClick={() => close()} color="primary" variant="contained" size="large">
                    Close
                </Button>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<MdExpandMore />}
                        >
                            <Typography className={styles.heading}>Registered users</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Table className={styles.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Phone</TableCell>
                                        <TableCell align="left">Childrens</TableCell>
                                        <TableCell align="left">Expectations</TableCell>
                                        <TableCell align="left">Sourse</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {registeredUsers.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.name}</TableCell>
                                        <TableCell align="left">{item.email}</TableCell>
                                        <TableCell align="left">{item.phone}</TableCell>
                                        <TableCell align="left">{item.children}</TableCell>
                                        <TableCell align="left">{item.reason}</TableCell>
                                        <TableCell align="left">{item.sourse}</TableCell>
                                        <TableCell align="center"><Button onClick={() => deleteRegisteredUser(item.id)} color="secondary" >Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        </div>
    );
};
