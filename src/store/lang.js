import {action} from 'easy-peasy';

export const lang = {
    current: 'ukr',
    toggle: action((state, payload) => {
        state.current = payload;
    }),
};
