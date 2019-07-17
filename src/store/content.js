import {action, computed} from 'easy-peasy';

export const content = {
    users: null,
    setUsers: action((state, payload) => {
        state.users = payload;
    }),
    deleteUser: action((state, payload) => {
        state.users = state.users.filter(item => item.id !== payload);
    }),


    programs: null,
    setPrograms: action((state, payload) => {
        state.programs = payload;
    }),
    addProgram: action((state, payload) => {
        state.programs.push(payload)
    }),
    updateProgram: action((state, payload) => {
        state.programs = state.programs.map(item => {
           return (item.id === payload.id) ? payload : item
        });
    }),
    deleteProgram: action((state, payload) => {
        state.programs = state.programs.filter(item => item.id !== payload);
    }),


    classes: null,
    setClasses: action((state, payload) => {
        state.classes = payload;
    }),
    addClass: action((state, payload) => {
        state.classes.push(payload)
    }),
    updateClass: action((state, payload) => {
        state.classes = state.classes.map(item => {
           return (item.id === payload.id) ? payload : item
        });
    }),
    // removeRegistrations: action((state, payload) => {
    //     state.classes = state.classes.map(item => {
    //        return (item.id === payload.id) ? payload : item
    //     });
    // }),
    deleteClass: action((state, payload) => {
        state.classes = state.classes.filter(item => item.id !== payload);
    }),


    

}