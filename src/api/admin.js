import {firebaseAuth} from '../config/firebase';

export const admin = {
    login: async({email, password}) => {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    },
    logout: async() => {
        return firebaseAuth.signOut();
    },
    updateEmail: async(email) => {
        const user = firebaseAuth.currentUser;
        return user.updateEmail(email);
    },
    updatePassword: async(password) => {
        const user = firebaseAuth.currentUser;
        return user.updatePassword(password);
    },
}