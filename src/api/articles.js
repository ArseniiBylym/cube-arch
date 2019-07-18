import {firebaseAuth, firebaseDB} from '../config/firebase';

const articlesCol = firebaseDB.collection('articles');

export const articles = {
    getAll: async() => {
        return articlesCol.orderBy('createdAt').get();
    },
    getArticle: async(id) => {
        return articlesCol.doc(id).get();
    },
    add: async(newProgram) => {
        return articlesCol.add(newProgram);
    },
    update: async({id, updatedProgram}) => {
        return articlesCol.doc(id).update(updatedProgram);
    },
    delete: async(id) => {
        return articlesCol.doc(id).delete();
    }
}