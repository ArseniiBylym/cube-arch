import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import styles from './AllRegisterModals.module.scss';
import {useStoreState} from 'easy-peasy';
import moment from 'moment';
import {data} from './../../assets/data/index';
import { Spinner } from './../shared';
import { Api } from './../../api/index';

export const ClassRegisterModal = props => {
    const {open, closeModal, eventId, eventName, datetime} = props;
    const [sending, setSending] = useState(false);
    const [registerConfirmed, setRegisterConfirmed] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [children, setChildren] = useState('');
    const [reason, setReason] = useState('');
    const [sourse, setSourse] = useState('');

    const clearFormState = () => {
        setEmail('')
        setName('')
        setPhone('')
        setChildren('')
        setReason('')
        setSourse('')
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
            children,
            reason,
            sourse,
            createdAt: Date.now() + '',
        }

        setSending(true);
        try {
            await Api.classes.registerToClass({classId: eventId, user: registerData});
            Api.notifications.send(`New registration: ${registerData.name} registered to ${eventName.ukr} at ${moment(+datetime).format("DD/MM")}`)
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
        return !email || !phone || !name || !children || !reason;
    }

    return (
        <div className={styles.root}>
            <Dialog 
                open={open} 
                onClose={closeModal} 
                aria-labelledby="form-dialog-title"
                classes={{paper: styles.paper}}
            >
                <div className={styles.header}>
                    <div className={styles.title}>{eventName[lang]}</div>
                    <div className={styles.subTitle}>
                        <span>{data.lang[lang].pages.classes.details.date}: </span>
                        <span>{moment(+datetime).format("HH:mm DD/MM/YYYY")}</span>
                    </div>
                </div>

                <DialogContent className={styles.formContainer}>
                    {sending && (
                        <Spinner />
                    )}
                    {registerConfirmed ? (
                        <div className={styles.confirmed}>{data.modals.confirmMessage[lang]}</div>
                    ) : (
                       <div className={styles.form}>
                            <TextField
                                autoFocus
                                margin="normal"
                                name="email"
                                label={data.modals.classRegister[lang].email}
                                type="email"
                                fullWidth
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                            />
                              <TextField
                                margin="normal"
                                name="name"
                                label={data.modals.classRegister[lang].name}
                                type="text"
                                fullWidth
                                required
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="phone"
                                label={data.modals.classRegister[lang].phone}
                                type="phone"
                                fullWidth
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="children"
                                label={data.modals.classRegister[lang].children}
                                type="text"
                                fullWidth
                                required
                                multiline
                                rows={2}
                                onChange={(e) => setChildren(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="reason"
                                label={data.modals.classRegister[lang].reason}
                                type="text"
                                fullWidth
                                required
                                multiline
                                rows={2}
                                onChange={(e) => setReason(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="sourse"
                                label={data.modals.classRegister[lang].sourse}
                                type="text"
                                fullWidth
                                multiline
                                rows={2}
                                onChange={(e) => setSourse(e.target.value)}
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
