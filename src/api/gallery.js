import {gallery as Gallery} from '../assets/data/mock/index';

import {firebaseAuth, firebaseDB} from '../config/firebase';

const galleryCol = firebaseDB.collection('gallery');

export const gallery = {
    getAll: async() => {
        return Gallery;
        // return galleryCol.get();
    },
    add: async(newGroup) => {
        return galleryCol.set(newGroup);
    },
    update: async({id, updatedGroup}) => {
        return galleryCol.doc(id).update(updatedGroup);
    },
    delete: async(id) => {
        return galleryCol.doc(id).delete();
    }
}