import React, {useState, useEffect} from 'react';
import {useStoreActions} from 'easy-peasy';
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
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import styles from './styles.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';
import moment from 'moment';
import {MdExpandMore} from 'react-icons/md';

export const ManageTourForm = props => {
    const {close, editedElem} = props;
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [userOrders, setUserOrders] = useState([]);

    const addTour = useStoreActions(state => state.content.addTour);
    const updateTour = useStoreActions(state => state.content.updateTour);

    const [fileMode, setFileMode] = useState(false);
    const [file, setFile] = useState(null);

    const [image, setImage] = useState('');
    const [fileUrl, setFileUrl] = useState(null);
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
        if (editedElem) {
            getSubscribers();
        }
    }, []);

    useEffect(() => {
        if (editedElem) {
            const {
                image,
                fileUrl,
                name,
                place,
                description,
                price,
                duration,
                auditory,
                datetime,
                open,
                orderable,
            } = editedElem;

            setImage(image);
            setFileUrl(fileUrl);
            setName(name);
            setPlace(place);
            setDescription(description);
            setPrice(price);
            setDuration(duration);
            setAuditory(auditory);
            setDatetime(moment(+datetime).format('YYYY-MM-DDTHH:mm'));
            setOpen(open);
            setOrderable(orderable);
        }
    }, []);

    const getSubscribers = async () => {
        try {
            const registrations = await Api.tours.getRegisteredUsers(editedElem.id);
            const orders = await Api.tours.getUserOrders(editedElem.id);

            let registrationsDocs = [];
            registrations.forEach(doc => {
                registrationsDocs.push({...doc.data(), id: doc.id});
            });
            setRegisteredUsers(registrationsDocs);

            let ordersDocs = [];
            orders.forEach(doc => {
                ordersDocs.push({...doc.data(), id: doc.id});
            });
            setUserOrders(ordersDocs);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (userId, userType) => {
        try {
            if (userType === 'registered') {
                await Api.tours.removeRegisteredUser(editedElem.id, userId);
                const updatedUsers = registeredUsers.filter(item => item.id !== userId);
                setRegisteredUsers(updatedUsers);
            } else {
                await Api.tours.removeUserOrder(editedElem.id, userId);
                const updatedUsers = userOrders.filter(item => item.id !== userId);
                setUserOrders(updatedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onCreate = async () => {
        const newDoc = {
            image,
            fileUrl,
            file,
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
            if (fileMode) {
                delete newDoc.image;
            } else {
                delete newDoc.file;
                delete newDoc.fileUrl;
            }
            if (editedElem) {
                await Api.tours.update({
                    id: editedElem.id,
                    newDoc,
                    fileName: editedElem.fileName,
                    callback: updateTour,
                });
            } else {
                await Api.tours.add({newDoc, callback: addTour});
            }
        } catch (error) {
            console.log(error);
        } finally {
            close();
        }
    };

    const fileInputChangeHandler = e => {
        const file = e.target.files[0];
        setFile(file);
        getImageFromFile(file);
    };

    const getImageFromFile = file => {
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                const image = reader.result;
                setFileUrl(image);
            },
            false,
        );
        reader.readAsDataURL(file);
    };

    return (
        <div className={styles.root}>
            <h1>{editedElem ? 'Edit' : 'Create new'} tour</h1>
            <img
                src={fileMode ? fileUrl || imagePlaceholder : image || imagePlaceholder}
                alt=""
                className={styles.image}
            />
            <Grid container justify="center" alignItems="center">
                <Grid item>Link</Grid>
                <Grid item>
                    <Switch
                        checked={fileMode}
                        onChange={() => setFileMode(!fileMode)}
                        color="primary"
                    />
                </Grid>
                <Grid item>File</Grid>
            </Grid>
            {fileMode ? (
                <TextField
                    onChange={fileInputChangeHandler}
                    type="file"
                    margin="normal"
                    variant="filled"
                />
            ) : (
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
            )}
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
                        onChange={e => setDatetime(e.target.value)}
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
                            <Checkbox
                                checked={orderable}
                                onChange={() => setOrderable(!orderable)}
                                value={orderable}
                            />
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
                        onChange={e => setName({...name, en: e.target.value})}
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
                        onChange={e => setName({...name, ukr: e.target.value})}
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
                        onChange={e => setPlace({...place, en: e.target.value})}
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
                        onChange={e => setPlace({...place, ukr: e.target.value})}
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
                        onChange={e => setDescription({...description, en: e.target.value})}
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
                        onChange={e => setDescription({...description, ukr: e.target.value})}
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
                        onChange={e => setPrice({...price, en: e.target.value})}
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
                        onChange={e => setPrice({...price, ukr: e.target.value})}
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
                        onChange={e => setDuration({...duration, en: e.target.value})}
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
                        onChange={e => setDuration({...duration, ukr: e.target.value})}
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
                        onChange={e => setAuditory({...auditory, en: e.target.value})}
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
                        onChange={e => setAuditory({...auditory, ukr: e.target.value})}
                        variant="outlined"
                        value={auditory.ukr}
                    />
                </Grid>
            </Grid>
            <div className={styles.buttons}>
                <Button onClick={onCreate} color="secondary" variant="contained" size="large">
                    {editedElem ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => close()} color="primary" variant="contained" size="large">
                    Close
                </Button>
            </div>
            {editedElem && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
                                <Typography className={styles.heading}>Registered users</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table className={styles.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="left">Email</TableCell>
                                            <TableCell align="left">Phone</TableCell>
                                            <TableCell align="left">Childrens</TableCell>
                                            <TableCell align="left">Expectations</TableCell>
                                            <TableCell align="left">Sourse</TableCell>
                                            <TableCell align="left" />
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
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() =>
                                                            deleteUser(item.id, 'registered')
                                                        }
                                                        color="secondary"
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
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
                                            <TableCell align="left" />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userOrders.map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell align="left">{item.name}</TableCell>
                                                <TableCell align="left">
                                                    {moment(item.datetime).format('DD-MM HH:mm')}
                                                </TableCell>
                                                <TableCell align="left">{item.email}</TableCell>
                                                <TableCell align="left">{item.phone}</TableCell>
                                                <TableCell align="left">{item.children}</TableCell>
                                                <TableCell align="left">{item.reason}</TableCell>
                                                <TableCell align="left">{item.sourse}</TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() =>
                                                            deleteUser(item.id, 'ordered')
                                                        }
                                                        color="secondary"
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
