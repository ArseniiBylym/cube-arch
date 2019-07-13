import {groups, programs, tours, classes, articles, gallery} from '../assets/data/mock/index';

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


}