import {firebaseAuth, firebaseDB} from '../config/firebase';

const programsCol = firebaseDB.collection('programs');

export const programs = {
    getAll: async() => {
        return programsCol.get();
    },
    add: async(newProgram) => {
        return programsCol.add(newProgram);
    },
    update: async({id, updatedProgram}) => {
        return programsCol.doc(id).update(updatedProgram);
    },
    delete: async(id) => {
        return programsCol.doc(id).delete();
    }
}