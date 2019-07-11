import {groups, programs, tours, classes} from '../assets/data/mock/index';

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
}