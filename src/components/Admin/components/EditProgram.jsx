import React, {useState, useEffect} from 'react';
import {useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';
import moment from 'moment';
import {MdExpandMore} from 'react-icons/md'


export const EditProgram = props => {
    const {close, program} = props;
    const [registeredUsers, setRegisteredUsers] = useState([])

    const updateProgram = useStoreActions(state => state.content.updateProgram);

    const [image, setImage] = useState('');
    const [name, setName] = useState({en: '', ukr: ''});
    const [description, setDescription] = useState({en: '', ukr: ''});
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [places, setPlaces] = useState(10);

    useEffect(() => {
        getRegistrations();
    }, [])

    useEffect(() => {
        setImage(program.image);
        setName(program.name);
        setDescription(program.description);
        setPrice(program.price);
        setDuration(program.duration);
        setStartDate(moment(+program.startDate).format("YYYY-MM-DD"))
        setEndDate(moment(+program.endDate).format("YYYY-MM-DD"))
        setPlaces(program.places);
    }, []);

    const onNameChange = lang => e => {
        setName({...name, [lang]: e.target.value});
    };

    const onDescriptionChange = lang => e => {
        setDescription({...description, [lang]: e.target.value});
    };

    const getRegistrations = async() => {
        try {
            const snapshot = await Api.programs.getRegisteredUsers(program.id);
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
            await Api.programs.removeRegisteredUser(program.id, userId);
            const updatedUsers = registeredUsers.filter(item => item.id !== userId);
            setRegisteredUsers(updatedUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdate = async () => {
        const updatedProgram = {
            image,
            name,
            description,
            price,
            duration,
            places,
            startDate: new Date(startDate).getTime() + '',
            endDate: new Date(endDate).getTime() + '',
            createdAt: Date.now() + '',
        };
        try {
            await Api.programs.update({id: program.id, updatedProgram});
            updateProgram({...updatedProgram, id: program.id});
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>Edit course</h1>
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
            <h3>Name</h3>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        name="name_en"
                        label="Course name"
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
                        label="Назва курсу"
                        type="text"
                        fullWidth
                        required
                        onChange={onNameChange('ukr')}
                        variant="outlined"
                        value={name.ukr}
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
