import {firebaseAuth, firebaseDB} from '../config/firebase';

const toursCol = firebaseDB.collection('tours');

export const tours = {
    getAll: async() => {
        return toursCol.get();
    },
    add: async(newElem) => {
        return toursCol.add(newElem);
    },
    update: async({id, updatedDoc}) => {
        return toursCol.doc(id).update(updatedDoc);
    },
    delete: async(id) => {
        return toursCol.doc(id).delete();
    },

    registerToTour: async({classId, user}) => {
        return toursCol.doc(classId).collection('registrations').add(user);
    },
    orderToTour: async({classId, user}) => {
        return toursCol.doc(classId).collection('orders').add(user);
    },

    getRegisteredUsers: async(id) => {
        return toursCol.doc(id).collection('registrations').orderBy('createdAt').get();
    },
    removeRegisteredUser: async(id, userId) => {
        return toursCol.doc(id).collection('registrations').doc(userId).delete();
    },
    getUserOrders: async(id) => {
        return toursCol.doc(id).collection('orders').orderBy('createdAt').get();
    },
    removeUserOrder: async(id, userId) => {
        return toursCol.doc(id).collection('orders').doc(userId).delete();
    },
}