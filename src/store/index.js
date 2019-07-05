import {createStore} from 'easy-peasy';
import {auth} from './auth';
import {lang} from './lang'

export const storeModel = {
    auth,
    lang,
};

export const store = createStore(storeModel);
