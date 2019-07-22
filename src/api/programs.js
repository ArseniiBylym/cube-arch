import {firebaseDB} from '../config/firebase';

const programsCol = firebaseDB.collection('programs');

export const programs = {
    getAll: async() => {
        return programsCol.get();
    },
    getProgram: async(id) => {
        return programsCol.doc(id).get();
    },
    add: async(newProgram) => {
        return programsCol.add(newProgram);
    },
    update: async({id, updatedProgram}) => {
        return programsCol.doc(id).update(updatedProgram);
    },
    delete: async(id) => {
        return programsCol.doc(id).delete();
    },

    registerToProgram: async({classId, user}) => {
        return programsCol.doc(classId).collection('registrations').add(user);
    },

    getRegisteredUsers: async(id) => {
        return programsCol.doc(id).collection('registrations').orderBy('createdAt').get();
    },
    removeRegisteredUser: async(id, userId) => {
        return programsCol.doc(id).collection('registrations').doc(userId).delete();
    },
}