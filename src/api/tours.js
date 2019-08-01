import uuid from 'uuid/v4';
import {firebaseDB, firebaseStorage} from '../config/firebase';

const toursCol = firebaseDB.collection('tours');

export const tours = {
    getAll: async() => {
        return toursCol.get();
    },
    add: async ({newDoc, callback}) => {
        const {file} = newDoc;
        if (!file) {
            const doc = await toursCol.add(newDoc);
            return callback({...newDoc, id: doc.id});
        }
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage
            .ref()
            .child(`tours/${name}`)
            .put(file);
        task.on(
            'state_changed',
            function() {},
            function(error) {
                console.log(error);
            },
            function() {
                task.snapshot.ref.getDownloadURL().then(async url => {
                    delete newDoc.file;
                    const doc = await toursCol.add({...newDoc, fileUrl: url, fileName: name});
                    callback({...newDoc, fileUrl: url, fileName: name, id: doc.id});
                });
            },
        );
    },
    update: async ({id, newDoc, callback}) => {
        const {file, fileName, image} = newDoc;
        if (!file) {
            if (image && fileName) {
                await firebaseStorage
                    .ref()
                    .child(`tours/${fileName}`)
                    .delete();
                delete newDoc.fileName;
            }
            await toursCol.doc(id).set(newDoc);
            return callback({...newDoc, id});
        } else {
            if (fileName) {
                await firebaseStorage
                    .ref()
                    .child(`tours/${fileName}`)
                    .delete();
            }
            const fileExtension = newDoc.file.name.split('.').slice(-1)[0];
            const name = `${uuid()}.${fileExtension}`;
            const task = firebaseStorage
                .ref()
                .child(`tours/${name}`)
                .put(newDoc.file);
            task.on(
                'state_changed',
                function() {},
                function(error) {
                    console.log(error);
                },
                function() {
                    task.snapshot.ref.getDownloadURL().then(async url => {
                        delete newDoc.file;
                        await toursCol.doc(id).set({...newDoc, fileUrl: url, fileName: name});
                        callback({...newDoc, fileUrl: url, fileName: name, id});
                    });
                },
            );
        }
    },
    delete: async(id) => {
        return toursCol.doc(id).delete();
    },
    deleteFile: async fileName => {
        return await firebaseStorage
            .ref()
            .child(`tours/${fileName}`)
            .delete();
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