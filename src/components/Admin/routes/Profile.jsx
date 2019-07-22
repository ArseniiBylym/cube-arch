import React, {useState} from 'react'
import styles from './styles.module.scss'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Api } from './../../../api/index';

export const Profile = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const updateEmail = async() => {
        try {
            Api.admin.updateEmail(email);
            setEmail('')
        } catch (error) {
            console.log(error)
        }
    }

    const updatePassword = async() => {
        try{
            Api.admin.updatePassword(password);
            setPassword('')
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.root}>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        margin="normal"
                        name="email"
                        label="Update email"
                        type="email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        value={email}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button disabled={!email} onClick={() => setEmail('')} size="large" variant="contained" color="primary">Clear</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button disabled={!email} onClick={updateEmail} size="large" variant="contained" color="secondary">Update</Button>
                </Grid>
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        margin="normal"
                        name="email"
                        label="Update password (6 symbols min)"
                        type="text"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        value={password}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button disabled={!password} onClick={() => setPassword('')} size="large" variant="contained" color="primary">Clear</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button disabled={!password} onClick={updatePassword} size="large" variant="contained" color="secondary">Update</Button>
                </Grid>
            </Grid>
        </div>
    )
};
