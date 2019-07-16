import {firebaseAuth, firebaseDB} from '../config/firebase';

export const users = {
    getAll: async() => {
        return firebaseDB.collection('users').get();
    },
    register: async(user) => {
        return firebaseDB.collection('users').set(user);
    },
    delete: async(id) => {
        return firebaseDB.collection('users').doc(id).delete();
    }
}