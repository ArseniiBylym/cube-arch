import {articles as Articles} from '../assets/data/mock/index';
import {firebaseAuth, firebaseDB} from '../config/firebase';

const articlesCol = firebaseDB.collection('articles');

export const articles = {
    getAll: async() => {
        // return Articles;
        return articlesCol.orderBy('createdAt').get();
    },
    getDetails: async(id) => {
        const post = Articles.find(item => item.id === +id);
        return post; 
        // return articles.doc(id);
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