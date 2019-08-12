import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import styles from './AllRegisterModals.module.scss';
import {useStoreState} from 'easy-peasy';
import Slide from '@material-ui/core/Slide';
import {data} from './../../assets/data/index';
import { Spinner } from './../shared';
import { Api } from './../../api/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const SubscribeModal = props => {
    const {open, closeModal} = props;
    const [sending, setSending] = useState(false);
    const [registerConfirmed, setRegisterConfirmed] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const clearFormState = () => {
        setEmail('')
        setName('')
        setPhone('')
    }

    const lang = useStoreState(state => state.lang.current);

    const closeHandler = () => {
        clearFormState();
        closeModal();
    }

    const sendHandler = async() => {
        const registerData = {
            email,
            name,
            phone,
        }

        setSending(true);
        try {
            await Api.users.register(registerData);
            Api.notifications.send(`New user subscribed: ${registerData.name} ${registerData.email}`)
            setRegisterConfirmed(true);
            setTimeout(() => {
                closeModal();
                clearFormState();
                setTimeout(() => {
                    setRegisterConfirmed(false);
                }, 500)
            }, 3000)
        } catch (error) {
            console.log(error);
        } finally {
            setSending(false);
            clearFormState();
        }
    }
    const isDisabled = () => {
        return !email || !phone || !name;
    }

    return (
        <div className={styles.root}>
            <Dialog 
                open={open} 
                onClose={closeModal} 
                aria-labelledby="form-dialog-title"
                classes={{paper: styles.paper}}
                TransitionComponent={Transition}
            >
                <div className={styles.header}>
                    <div className={styles.title}>{data.modals.subscribe[lang].title}</div>
                </div>

                <DialogContent className={styles.formContainer}>
                    {sending && (
                        <Spinner />
                    )}
                    {registerConfirmed ? (
                        <div className={styles.confirmed}>{data.modals.subscribe[lang].confirmMessage}</div>
                    ) : (
                       <div className={styles.form}>
                            <TextField
                                margin="normal"
                                name="email"
                                label={data.modals.subscribe[lang].email}
                                type="email"
                                fullWidth
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                            />
                              <TextField
                                margin="normal"
                                name="name"
                                label={data.modals.subscribe[lang].name}
                                type="text"
                                fullWidth
                                required
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="phone"
                                label={data.modals.subscribe[lang].phone}
                                type="phone"
                                fullWidth
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                variant="outlined"
                            />
                        </div>
                   )}
                </DialogContent>
                {!registerConfirmed && (
                    <DialogActions>
                        <Button className={styles.buttonConfirm} disabled={sending || isDisabled()} onClick={sendHandler} color="primary">
                            {data.modals.buttons.confirm[lang]}
                        </Button>
                        <Button className={styles.buttonCancel} disabled={sending} onClick={closeHandler} color="primary">
                        {data.modals.buttons.cancel[lang]}
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
};
