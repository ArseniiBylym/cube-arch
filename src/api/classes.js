import uuid from 'uuid/v4';

import {firebaseDB, firebaseStorage} from '../config/firebase';

const classesCol = firebaseDB.collection('classes');

export const classes = {
    getAll: async() => {
        return classesCol.orderBy('datetime').get();
    },
    // add: async(newDoc) => {
    //     return classesCol.add(newDoc);
    // },
    add: async ({newDoc, callback}) => {
        const {file} = newDoc;
        if (!file) {
            const doc = await classesCol.add(newDoc);
            return callback({...newDoc, id: doc.id});
        }
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage
            .ref()
            .child(`classes/${name}`)
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
                    const doc = await classesCol.add({...newDoc, fileUrl: url, fileName: name});
                    callback({...newDoc, fileUrl: url, fileName: name, id: doc.id});
                });
            },
        );
    },
    // update: async({id, newDoc}) => {
    //     return classesCol.doc(id).update(newDoc);
    // },
    update: async ({id, newDoc, fileName, callback}) => {
        const {file} = newDoc;
        if (!file) {
            if (fileName) {
                await firebaseStorage
                    .ref()
                    .child(`classes/${fileName}`)
                    .delete();
            }
            await classesCol.doc(id).set(newDoc);
            return callback({...newDoc, id});
        } else {
            if (fileName) {
                await firebaseStorage
                    .ref()
                    .child(`classes/${fileName}`)
                    .delete();
            }
            const fileExtension = newDoc.file.name.split('.').slice(-1)[0];
            const name = `${uuid()}.${fileExtension}`;
            const task = firebaseStorage
                .ref()
                .child(`classes/${name}`)
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
                        await classesCol.doc(id).set({...newDoc, fileUrl: url, fileName: name});
                        callback({...newDoc, fileUrl: url, fileName: name, id});
                    });
                },
            );
        }
    },
    delete: async(id) => {
        return classesCol.doc(id).delete();
    },
    deleteFile: async fileName => {
        return await firebaseStorage
            .ref()
            .child(`classes/${fileName}`)
            .delete();
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