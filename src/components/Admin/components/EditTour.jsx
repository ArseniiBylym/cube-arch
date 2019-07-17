import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import styles from './styles/NewTour.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';
import {MdExpandMore} from 'react-icons/md'

export const EditTour = props => {
    const {close, editedElem} = props;
    const [registeredUsers, setRegisteredUsers] = useState([])
    const [userOrders, setUserOrders] = useState([])

    const updateTour = useStoreActions(state => state.content.updateTour);

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

    useEffect(() => {
        getRegistrations();
        getOrders();
    }, [])

    useEffect(() => {
        setImage(editedElem.image);
        setName(editedElem.name);
        setPlace(editedElem.place);
        setDescription(editedElem.description);
        setPrice(editedElem.price);
        setDuration(editedElem.duration);
        setAuditory(editedElem.auditory);
        setDatetime(moment(+editedElem.datetime).format("YYYY-MM-DDTHH:mm"));
        setOpen(editedElem.open);
        setOrderable(editedElem.orderable);
    }, [])

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

    const getRegistrations = async() => {
        try {
            const snapshot = await Api.tours.getRegisteredUsers(editedElem.id);
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            console.log(docs)
            setRegisteredUsers(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const getOrders = async() => {
        try {
            const snapshot = await Api.tours.getUserOrders(editedElem.id);
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            console.log(docs)
            setUserOrders(docs)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRegisteredUser = async (userId) => {
        try {
            await Api.tours.removeRegisteredUser(editedElem.id, userId);
            const updatedUsers = registeredUsers.filter(item => item.id !== userId);
            setRegisteredUsers(updatedUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOrderedUser = async(userId) => {
        try {
            await Api.tours.removeUserOrder(editedElem.id, userId);
            const updatedUsers = userOrders.filter(item => item.id !== userId);
            setUserOrders(updatedUsers)
        } catch (error) {
            console.log(error)
        }
    }

    const onUpdate = async () => {
        const updatedDoc = {
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
            await Api.tours.update({id: editedElem.id, updatedDoc});
            updateTour({...updatedDoc, id: editedElem.id});
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    return (
        <div className={styles.root}>
            <h1>Update tour</h1>
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
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
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
                                        <TableCell align="left">{index + 1}</TableCell>
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
                <Grid item xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<MdExpandMore />}
                        >
                            <Typography className={styles.heading}>User orders</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Table className={styles.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Phone</TableCell>
                                        <TableCell align="left">Childrens</TableCell>
                                        <TableCell align="left">Expectations</TableCell>
                                        <TableCell align="left">Sourse</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {userOrders.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell align="left">{item.name}</TableCell>
                                        <TableCell align="left">{moment(item.datetime).format("DD-MM HH:mm")}</TableCell>
                                        <TableCell align="left">{item.email}</TableCell>
                                        <TableCell align="left">{item.phone}</TableCell>
                                        <TableCell align="left">{item.children}</TableCell>
                                        <TableCell align="left">{item.reason}</TableCell>
                                        <TableCell align="left">{item.sourse}</TableCell>
                                        <TableCell align="center"><Button onClick={() => deleteOrderedUser(item.id)} color="secondary" >Delete</Button></TableCell>
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
