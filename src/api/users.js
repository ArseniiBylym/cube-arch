import {firebaseDB} from '../config/firebase';

export const users = {
    getAll: async() => {
        return firebaseDB.collection('users').orderBy('createdAt').get();
    },
    register: async(user) => {
        user.createdAt = Date.now() + '';
        return firebaseDB.collection('users').add(user);
    },
    delete: async(id) => {
        return firebaseDB.collection('users').doc(id).delete();
    },


    getAllTestClasses: async() => {
        return firebaseDB.collection('testClasses').orderBy('createdAt').get();
    },
    registerTestClass: async(user) => {
        user.createdAt = Date.now() + '';
        return firebaseDB.collection('testClasses').add(user);
    },
    deleteTestClass: async(id) => {
        return firebaseDB.collection('testClasses').doc(id).delete();
    }
}