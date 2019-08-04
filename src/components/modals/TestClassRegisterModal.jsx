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

export const TestClassRegisterModal = props => {
    const {open, closeModal} = props;
    const [sending, setSending] = useState(false);
    const [registerConfirmed, setRegisterConfirmed] = useState(false);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [child, setChild] = useState('');

    const clearFormState = () => {
        setEmail('')
        setName('')
        setPhone('')
        setChild('')
    }

    const lang = useStoreState(state => state.lang.current);

    const sendHandler = async() => {
        const registerData = {
            email,
            name,
            phone,
            child
        }

        setSending(true);
        try {
            await Api.users.registerTestClass(registerData);
            Api.notifications.send(`New user has registered to the test class: ${registerData.name} ${registerData.email}`)
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
        return !email || !phone || !name || !child;
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
                    <div className={styles.title}>{data.modals.testClass[lang].title}</div>
                </div>

                <DialogContent className={styles.formContainer}>
                    {sending && (
                        <Spinner />
                    )}
                    {registerConfirmed ? (
                        <div className={styles.confirmed}>{data.modals.testClass[lang].confirmMessage}</div>
                    ) : (
                       <div className={styles.form}>
                            <TextField
                                margin="normal"
                                name="email"
                                label={data.modals.testClass[lang].email}
                                type="email"
                                fullWidth
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                            />
                              <TextField
                                margin="normal"
                                name="name"
                                label={data.modals.testClass[lang].name}
                                type="text"
                                fullWidth
                                required
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                            />
                             <TextField
                                margin="normal"
                                name="phone"
                                label={data.modals.testClass[lang].phone}
                                type="phone"
                                fullWidth
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                margin="normal"
                                name="child"
                                label={data.modals.testClass[lang].child}
                                type="text"
                                fullWidth
                                required
                                onChange={(e) => setChild(e.target.value)}
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
