import uuid from 'uuid/v4';
import {firebaseDB, firebaseStorage} from '../config/firebase';

const galleryCol = firebaseDB.collection('gallery');

export const gallery = {
    getAll: async() => {
        return galleryCol.get();
    },
    uploadImage: async({file, callback}) => {
        const fileExtension = file.name.split('.').slice(-1)[0];
        const name = `${uuid()}.${fileExtension}`;
        const task = firebaseStorage.ref().child(`gallery/${name}`).put(file)
        task.on('state_changed', 
            function() {},
            function(error) {console.log(error)},
            function() {
                task.snapshot.ref.getDownloadURL()
                    .then(async url => {
                        const doc = await galleryCol.add({url, name})
                        callback({url, name, id: doc.id})
                    }) 
            }
        )
    },
    deleteImage: async({image, callback}) => {
        firebaseStorage.ref().child(`gallery/${image.name}`).delete()
            .then(async function() {
                await galleryCol.doc(image.id).delete();
                callback(image.id)
            })
            .catch(function(error) {
                console.log(error)
            })
    }
}