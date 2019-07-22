import {action, computed} from 'easy-peasy';

export const auth = {
    admin: null,
    adminFetched: false,
    isAuth: computed(state => !!state.admin),
    login: action((state, payload) => {
        state.adminFetched = true;
    }),
    loginSuccess: action((state, payload) => {
        fillStorage(payload.email, payload.password);
        state.admin = payload.admin;
        state.adminFetched = true;
    }),
    loginFailed: action((state) => {
        clearStorage()
        state.admin = null;
        state.adminFetched = true;
    }),
    logout: action(state => {
        state.admin = null;
    })
};

const fillStorage = (email, password) => {
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPassword', password);
    localStorage.setItem('expDate', +Date.now() + 1 * 24 * 60 * 60 * 1000);
}

const clearStorage = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
    localStorage.removeItem('expDate');
}
