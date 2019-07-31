import uuid from 'uuid/v4';
import {firebaseDB, firebaseStorage} from '../config/firebase';

const programsCol = firebaseDB.collection('programs');

export const programs = {
    getAll: async() => {
        return programsCol.get();
    },
    getProgram: async(id) => {
        return programsCol.doc(id).get();
    },
    add: async ({newDoc, callback}) => {
        const {file} = newDoc;
        if (!file) {
            const doc = await programsCol.add(newDoc);
            return callback({...newDoc, id: doc.id});
        }
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage
            .ref()
            .child(`programs/${name}`)
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
                    const doc = await programsCol.add({...newDoc, fileUrl: url, fileName: name});
                    callback({...newDoc, fileUrl: url, fileName: name, id: doc.id});
                });
            },
        );
    },
    update: async ({id, newDoc, fileName, callback}) => {
        const {file} = newDoc;
        if (!file) {
            if (fileName) {
                await firebaseStorage
                    .ref()
                    .child(`programs/${fileName}`)
                    .delete();
            }
            await programsCol.doc(id).set(newDoc);
            return callback({...newDoc, id});
        } else {
            if (fileName) {
                await firebaseStorage
                    .ref()
                    .child(`programs/${fileName}`)
                    .delete();
            }
            const fileExtension = newDoc.file.name.split('.').slice(-1)[0];
            const name = `${uuid()}.${fileExtension}`;
            const task = firebaseStorage
                .ref()
                .child(`programs/${name}`)
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
                        await programsCol.doc(id).set({...newDoc, fileUrl: url, fileName: name});
                        callback({...newDoc, fileUrl: url, fileName: name, id});
                    });
                },
            );
        }
    },
    delete: async(id) => {
        return programsCol.doc(id).delete();
    },
    deleteFile: async fileName => {
        return await firebaseStorage
            .ref()
            .child(`programs/${fileName}`)
            .delete();
    },
    registerToProgram: async({classId, user}) => {
        return programsCol.doc(classId).collection('registrations').add(user);
    },

    getRegisteredUsers: async(id) => {
        return programsCol.doc(id).collection('registrations').orderBy('createdAt').get();
    },
    removeRegisteredUser: async(id, userId) => {
        return programsCol.doc(id).collection('registrations').doc(userId).delete();
    },
}