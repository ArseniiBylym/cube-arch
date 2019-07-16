import {groups, programs, tours, classes, articles, gallery} from '../assets/data/mock/index';
import {firebaseAuth} from '../config/firebase';

export class Api {
    static getGroups() {
        return groups;
    }

    static getPrograms() {
        return programs;
    }

    static getTours() {
        return tours;
    }

    static getClasses() {
        return classes;
    }

    static getArticles() {
        return articles;
    }

    static getBlogArticle(id) {
        const post = articles.find(item => item.id === +id);
        return post; 
    } 

    static getGallery() {
        return gallery;
    }

    static async login({email, password}) {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    }
}