import uuid from 'uuid/v4';
import {firebaseDB, firebaseStorage} from '../config/firebase';

const articlesCol = firebaseDB.collection('articles');

export const articles = {
    getAll: async () => {
        return articlesCol.orderBy('createdAt', 'desc').get();
    },
    getArticle: async id => {
        return articlesCol.doc(id).get();
    },
    add: async ({newDoc, callback}) => {
        const {file} = newDoc;
        if (!file) {
            const doc = await articlesCol.add(newDoc);
            return callback({...newDoc, id: doc.id});
        }
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage
            .ref()
            .child(`articles/${name}`)
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
                    const doc = await articlesCol.add({...newDoc, fileUrl: url, fileName: name});
                    callback({...newDoc, fileUrl: url, fileName: name, id: doc.id});
                });
            },
        );
    },
    update: async ({id, newDoc, callback}) => {
        const {file, fileName, imageUrl} = newDoc;
        if (!file) {
            if (imageUrl && fileName) {
                await firebaseStorage
                    .ref()
                    .child(`articles/${fileName}`)
                    .delete();
                delete newDoc.fileName;
            }
            await articlesCol.doc(id).set(newDoc);
            return callback({...newDoc, id});
        } else {
            if (fileName) {
                await firebaseStorage
                    .ref()
                    .child(`articles/${fileName}`)
                    .delete();
            }
            
            const fileExtension = newDoc.file.name.split('.').slice(-1)[0];
            const name = `${uuid()}.${fileExtension}`;
            const task = firebaseStorage
                .ref()
                .child(`articles/${name}`)
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
                        await articlesCol.doc(id).set({...newDoc, fileUrl: url, fileName: name});
                        callback({...newDoc, fileUrl: url, fileName: name, id});
                    });
                },
            );
        }
    },
    delete: async id => {
        return articlesCol.doc(id).delete();
    },
    deleteFile: async fileName => {
        return await firebaseStorage
            .ref()
            .child(`articles/${fileName}`)
            .delete();
    },
};
