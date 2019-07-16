import {classes as Classes} from '../assets/data/mock/index';

import {firebaseAuth, firebaseDB} from '../config/firebase';

const classesCol = firebaseDB.collection('classes');

export const classes = {
    getAll: async() => {
        return Classes;
        // return classesCol.get();
    },
    add: async(newGroup) => {
        return classesCol.set(newGroup);
    },
    update: async({id, updatedGroup}) => {
        return classesCol.doc(id).update(updatedGroup);
    },
    delete: async(id) => {
        return classesCol.doc(id).delete();
    }
}