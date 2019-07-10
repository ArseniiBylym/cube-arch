import {groups, programs, tours} from '../assets/data/mock/index';

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
}