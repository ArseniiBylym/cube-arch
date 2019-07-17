import {createStore} from 'easy-peasy';
import {auth} from './auth';
import {lang} from './lang'
import {content} from './content'
// import {registrations} from './registrations'

export const storeModel = {
    auth,
    lang,
    content,
    // registrations,
};

export const store = createStore(storeModel);
