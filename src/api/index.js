// import {groups, programs, tours, classes, articles, gallery} from '../assets/data/mock/index';
import {firebaseAuth, firebaseDB} from '../config/firebase';
import {users} from './users';
import {admin} from './admin';
import {groups} from './groups';
import {programs} from './programs';
import {classes} from './classes';
import {tours} from './tours';
import {articles} from './articles';
import {gallery} from './gallery';

export const Api = {
    users,
    admin,
    groups,
    programs,
    classes,
    tours,
    articles,
    gallery
}

// export class Api {
    // static getGroups() {
    //     return groups;
    // }

    // static getPrograms() {
    //     return programs;
    // }

    // static getTours() {
    //     return tours;
    // }

    // static getClasses() {
    //     return classes;
    // }

    // static getArticles() {
    //     return articles;
    // }

    // static async getUsers() {
    //     return firebaseDB.collection('users').get();
    // }

    // static getBlogArticle(id) {
    //     const post = articles.find(item => item.id === +id);
    //     return post; 
    // } 

    // static getGallery() {
    //     return gallery;
    // }

//     static async login({email, password}) {
//         return firebaseAuth.signInWithEmailAndPassword(email, password);
//     }
// }