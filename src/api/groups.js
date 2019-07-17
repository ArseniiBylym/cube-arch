import {firebaseAuth, firebaseDB} from '../config/firebase';

const groupsCol = firebaseDB.collection('groups');

export const groups = {
    getAll: async() => {
        return groupsCol.orderBy('startDate').get();
    },
    add: async(newDoc) => {
        return groupsCol.add(newDoc);
    },
    update: async({id, updatedDoc}) => {
        return groupsCol.doc(id).update(updatedDoc);
    },
    delete: async(id) => {
        return groupsCol.doc(id).delete();
    },

    registerToGroup: async({classId, user}) => {
        return groupsCol.doc(classId).collection('registrations').add(user);
    },

    getRegisteredUsers: async(id) => {
        return groupsCol.doc(id).collection('registrations').orderBy('createdAt').get();
    },
    removeRegisteredUser: async(id, userId) => {
        return groupsCol.doc(id).collection('registrations').doc(userId).delete();
    },
}