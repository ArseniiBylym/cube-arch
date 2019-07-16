import {tours as Tours} from '../assets/data/mock/index';
import {firebaseAuth, firebaseDB} from '../config/firebase';

const toursCol = firebaseDB.collection('tours');

export const tours = {
    getAll: async() => {
        return Tours;
        // return toursCol.get();
    },
    add: async(newProgram) => {
        return toursCol.set(newProgram);
    },
    update: async({id, updatedProgram}) => {
        return toursCol.doc(id).update(updatedProgram);
    },
    delete: async(id) => {
        return toursCol.doc(id).delete();
    }
}