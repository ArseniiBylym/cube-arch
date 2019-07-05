import {action, thunk, computed} from 'easy-peasy';

export const lang = {
    current: 'en',
    toggle: action((state, payload) => {
        state.current = payload;
    }),
};
