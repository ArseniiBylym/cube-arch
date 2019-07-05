import {action, thunk, computed} from 'easy-peasy';

export const auth = {
    user: null,
    isAuth: computed(state => !!state.user),
    loginSuccess: action((state, payload) => {
        state.user = payload;
    }),
    loginFailed: action((state) => {
        state.user = null
    }),
    logout: action(state => {
        state.user = null;
    })
};
