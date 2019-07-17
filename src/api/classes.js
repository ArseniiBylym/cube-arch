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
    },

    registerToClass: async({classId, user}) => {
        return classesCol.doc(classId).collection('registrations').add(user);
    },
    orderToClass: async({classId, user}) => {
        return classesCol.doc(classId).collection('orders').add(user);
    },

    getRegisteredUsers: async(id) => {
        return classesCol.doc(id).collection('registrations').orderBy('createdAt').get();
    },
    removeRegisteredUser: async(id, userId) => {
        return classesCol.doc(id).collection('registrations').doc(userId).delete();
    },
    getUserOrders: async(id) => {
        return classesCol.doc(id).collection('orders').orderBy('createdAt').get();
    },
    removeUserOrder: async(id, userId) => {
        return classesCol.doc(id).collection('orders').doc(userId).delete();
    },
}