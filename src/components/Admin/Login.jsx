import React, {useState} from 'react'
import styles from './Login.module.scss'
import {useStoreActions} from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Api } from './../../api';
import {Spinner} from './../shared';


export const Login = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [sending, setSending] = useState(false)

    const loginFailed = useStoreActions(actions => actions.auth.loginFailed);
    const loginSuccess = useStoreActions(actions => actions.auth.loginSuccess);

    const onSubmit = e => {
        e.preventDefault();
        setSending(true)
        const data = {email, password};
        Api.admin.login(data)
            .then(({user}) => {
                console.log(user)
                setEmail('')
                setPassword('')
                setError(false)
                loginSuccess({email, password, admin: {
                    email: user.email,
                    uid: user.uid
                }})
            })
            .catch(error => {
                console.log(error)
                setError(true)
                loginFailed()
            })
            .finally(() => setSending(false))
    }

    return (
        <div className={styles.root} onSubmit={onSubmit}>
            {error && (
                <div className={styles.error}>Wrong email or password!</div>
            )}
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item xs={12} md={6} lg={4}>
                    <form className={styles.form}>
                        <TextField
                            margin="normal"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                        />
                            <TextField
                            margin="normal"
                            name="password"
                            label="Password"
                            type="text"
                            fullWidth
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                        />
                        {sending ? (
                            <Spinner />
                        ) : (
                            <Button size="large" type="submit">Login</Button>
                        )}
                    </form>
                </Grid>
            </Grid>
        </div>
    )
};
