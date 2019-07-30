import uuid from 'uuid/v4';

import {firebaseDB, firebaseStorage} from '../config/firebase';

const articlesCol = firebaseDB.collection('articles');

export const articles = {
    getAll: async() => {
        return articlesCol.orderBy('createdAt', 'desc').get();
    },
    getArticle: async(id) => {
        return articlesCol.doc(id).get();
    },
    add: async({newDoc, callback}) => {
        const {file} = newDoc;
        if (!file) {
            const doc = await articlesCol.add(newDoc);
            return callback({...newDoc, id: doc.id});
        }
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage.ref().child(`articles/${name}`).put(file)
        task.on('state_changed', 
            function() {},
            function(error) {console.log(error)},
            function() {
                task.snapshot.ref.getDownloadURL()
                    .then(async url => {
                        delete newDoc.file;
                        const doc = await articlesCol.add({...newDoc, imageUrl: url, storageFileName: name})
                        callback({...newDoc, imageUrl: url, storageFileName: name, id: doc.id})
                    }) 
            }
        )

        // return articlesCol.add(newDoc);
    },
    update: async({id, newDoc, callback}) => {
        const {file, storageFileName} = newDoc;
        if (!file) {
            await articlesCol.doc(id).update(newDoc);
            return callback({...newDoc, id});
        }
        if (storageFileName) {
            await firebaseStorage.ref().child(`articles/${storageFileName}`).delete()
        }
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage.ref().child(`articles/${name}`).put(file)
        task.on('state_changed', 
            function() {},
            function(error) {console.log(error)},
            function() {
                task.snapshot.ref.getDownloadURL()
                    .then(async url => {
                        delete newDoc.file;
                        await articlesCol.doc(id).update({...newDoc, imageUrl: url, storageFileName: name})
                        callback({...newDoc, imageUrl: url, storageFileName: name, id})
                    }) 
            }
        )
        // return articlesCol.doc(id).update(newDoc);
    },
    delete: async(id) => {
        return articlesCol.doc(id).delete();
    }
}