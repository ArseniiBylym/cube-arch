import {action, computed} from 'easy-peasy';

export const admin = {
    users: null,
    setUsers: action((state, payload) => {
        state.users = payload;
    }),
    deleteUser: action((state, payload) => {
        state.users = state.users.filter(item => item.id !== payload);
    }),

    

}