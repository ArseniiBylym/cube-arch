import {firebaseDB} from '../config/firebase';

const articlesCol = firebaseDB.collection('articles');

export const articles = {
    getAll: async() => {
        return articlesCol.orderBy('createdAt', 'desc').get();
    },
    getArticle: async(id) => {
        return articlesCol.doc(id).get();
    },
    add: async(newDoc) => {
        return articlesCol.add(newDoc);
    },
    update: async({id, newDoc}) => {
        return articlesCol.doc(id).update(newDoc);
    },
    delete: async(id) => {
        return articlesCol.doc(id).delete();
    }
}