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

export const ClassOrderModal = props => {
    const {open, closeModal, eventId, eventName} = props;
    const [sending, setSending] = useState(false);
    const [registerConfirmed, setRegisterConfirmed] = useState(false);

    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [children, setChildren] = useState('');
    const [reason, setReason] = useState('');
    const [sourse, setSourse] = useState('');

    const clearFormState = () => {
        setDate(moment().format("YYYY-MM-DD"))
        setEmail('')
        setName('')
        setPhone('')
        setChildren('')
        setReason('')
        setSourse('')
    }

    const lang = useStoreState(state => state.lang.current);

    const sendHandler = () => {
        const registerData = {
            date,
            eventId,
            email,
            name,
            phone,
            children,
            reason,
            sourse,
        }
        console.log(registerData);

        setSending(true);
        setTimeout(() => {
            setRegisterConfirmed(true);
            setSending(false);
            setTimeout(() => {
                closeModal();
                clearFormState();
                setTimeout(() => {
                    setRegisterConfirmed(false);
                }, 500)
            }, 3000)
        }, 2000)
        
    }
    const isDisabled = () => {
        return !date || !email || !phone || !name || !children || !reason;
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
                                label={data.modals.classOrder[lang].date}
                                type="date"
                                fullWidth
                                required
                                onChange={(e) => setDate(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={date}
                            />
                            <TextField
                                margin="normal"
                                name="email"
                                label={data.modals.classOrder[lang].email}
                                type="email"
                                fullWidth
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                            />
                              <TextField
                                margin="normal"
                                name="name"
                                label={data.modals.classOrder[lang].name}
                                type="text"
                                fullWidth
                                required
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="phone"
                                label={data.modals.classOrder[lang].phone}
                                type="phone"
                                fullWidth
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="children"
                                label={data.modals.classOrder[lang].children}
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
                                label={data.modals.classOrder[lang].reason}
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
                                label={data.modals.classOrder[lang].sourse}
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
                        <Button className={styles.buttonCancel} disabled={sending} onClick={closeModal} color="primary">
                        {data.modals.buttons.cancel[lang]}
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
};
