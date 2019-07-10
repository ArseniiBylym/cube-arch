import {action, thunk, computed} from 'easy-peasy';

export const lang = {
    current: 'ukr',
    toggle: action((state, payload) => {
        state.current = payload;
    }),
};
