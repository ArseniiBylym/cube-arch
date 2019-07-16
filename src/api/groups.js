import {groups as Groups} from '../assets/data/mock/index';

import {firebaseAuth, firebaseDB} from '../config/firebase';

const groupsCol = firebaseDB.collection('groups');

export const groups = {
    getAll: async() => {
        return Groups;
        // return groupsCol.get();
    },
    add: async(newGroup) => {
        return groupsCol.set(newGroup);
    },
    update: async({id, updatedGroup}) => {
        return groupsCol.doc(id).update(updatedGroup);
    },
    delete: async(id) => {
        return groupsCol.doc(id).delete();
    }
}