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
import Switch from '@material-ui/core/Switch';
import {MdExpandMore} from 'react-icons/md';
import moment from 'moment';
import styles from './styles.module.scss';
import imagePlaceholder from '../../../assets/images/admin/empty_image.png';
import {Api} from './../../../api';

export const ManageProgramForm = props => {
    const {close, editedElem} = props;
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const addProgram = useStoreActions(state => state.content.addProgram);
    const updateProgram = useStoreActions(state => state.content.updateProgram);

    const [fileMode, setFileMode] = useState(false);
    const [file, setFile] = useState(null);

    const [image, setImage] = useState('');
    const [fileUrl, setFileUrl] = useState(null);
    const [name, setName] = useState({en: '', ukr: ''});
    const [description, setDescription] = useState({en: '', ukr: ''});
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);
    const [auditory, setAuditory] = useState({en: '', ukr: ''});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [places, setPlaces] = useState(10);

    useEffect(() => {
        if (editedElem) {
            getRegistrations();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (editedElem) {
            const {
                image,
                fileUrl,
                name,
                description,
                price,
                duration,
                auditory,
                startDate,
                endDate,
                places,
            } = editedElem;

            setImage(image);
            setFileUrl(fileUrl);
            setName(name);
            setDescription(description);
            setPrice(price);
            setDuration(duration);
            setAuditory(auditory);
            setStartDate(moment(+startDate).format('YYYY-MM-DD'));
            setEndDate(moment(+endDate).format('YYYY-MM-DD'));
            setPlaces(places);
            if (fileUrl) {
                setFileMode(true)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getRegistrations = async () => {
        try {
            const snapshot = await Api.programs.getRegisteredUsers(editedElem.id);
            let docs = [];
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id});
            });
            setRegisteredUsers(docs);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async userId => {
        try {
            await Api.programs.removeRegisteredUser(editedElem.id, userId);
            const updatedUsers = registeredUsers.filter(item => item.id !== userId);
            setRegisteredUsers(updatedUsers);
        } catch (error) {
            console.log(error);
        }
    };

    const onCreate = async () => {
        const newDoc = {
            image,
            fileUrl,
            file,
            fileName: editedElem && editedElem.fileName ? editedElem.fileName : null,
            name,
            description,
            price,
            duration,
            auditory,
            places,
            startDate: new Date(startDate).getTime() + '',
            endDate: new Date(endDate).getTime() + '',
            createdAt: Date.now() + '',
        };
        try {
            if (fileMode) {
                delete newDoc.image;
            } else {
                delete newDoc.file;
                delete newDoc.fileUrl;
            }
            if (editedElem) {
                await Api.programs.update({
                    id: editedElem.id,
                    newDoc,
                    callback: updateProgram,
                });
            } else {
                await Api.programs.add({newDoc, callback: addProgram});
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
            <h1>{editedElem ? 'Edit' : 'Create new'} course</h1>
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
                        label="Start date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        required
                        variant="outlined"
                        onChange={e => setStartDate(e.target.value)}
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
                        onChange={e => setEndDate(e.target.value)}
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
                        onChange={e => setPlaces(+e.target.value)}
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
                        onChange={e => setName({...name, en: e.target.value})}
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
                        onChange={e => setName({...name, ukr: e.target.value})}
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
                        onChange={e => setPrice(+e.target.value)}
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
                        onChange={e => setDuration(+e.target.value)}
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
                        onChange={e => setDescription({...description, en: e.target.value})}
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
                        onChange={e => setDescription({...description, ukr: e.target.value})}
                        variant="outlined"
                        value={description.ukr}
                        multiline
                        rows={5}
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
                                            <TableCell align="left">Name</TableCell>
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
                                                        onClick={() => deleteUser(item.id)}
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
