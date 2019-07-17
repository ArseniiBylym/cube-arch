import {classes as Classes} from '../assets/data/mock/index';

import {firebaseAuth, firebaseDB} from '../config/firebase';

const classesCol = firebaseDB.collection('classes');

export const classes = {
    getAll: async() => {
        return classesCol.orderBy('datetime').get();
    },
    add: async(newGroup) => {
        return classesCol.add(newGroup);
    },
    update: async({id, updatedDoc}) => {
        return classesCol.doc(id).update(updatedDoc);
    },
    // removeRegistrations: async({id, updatedDoc}) => {
    //     return classesCol.doc(id).update(updatedDoc);
    // },
    delete: async(id) => {
        return classesCol.doc(id).delete();
    }
}