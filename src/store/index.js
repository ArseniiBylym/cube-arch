import {createStore} from 'easy-peasy';
import {auth} from './auth';
import {lang} from './lang'
import {content} from './content'

export const storeModel = {
    auth,
    lang,
    content
};

export const store = createStore(storeModel);
