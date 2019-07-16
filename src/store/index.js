import {createStore} from 'easy-peasy';
import {auth} from './auth';
import {lang} from './lang'
import {admin} from './admin'

export const storeModel = {
    auth,
    lang,
    admin
};

export const store = createStore(storeModel);
