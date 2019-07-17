import {action, computed} from 'easy-peasy';

export const registrations = {

    //class orders
    classRegisterList: null,
    setClassRegisterList: action((state, payload) => {
        state.classRegisterList = payload;
    }),
    removeFromClassRegisterList: action((state, payload) => {
        state.classOrderList = state.classRegisterList.filter(item => item.id !== payload)
    }),

    classOrderList: null,
    setClassOrderList: action((state, payload) => {
        state.classOrderList = payload;
    }),
    removeFromClassOrderList: action((state, payload) => {
        state.classOrderList = state.classOrderList.filter(item => item.id !== payload)
    }),



    //group orders
    groupRegisterList: null,
    setGroupRegisterList: action((state, payload) => {
        state.groupRegisterList = payload;
    }),
    removeFromGroupRegisterList: action((state, payload) => {
        state.groupRegisterList = state.groupRegisterList.filter(item => item.id !== payload)
    }),

    groupOrderList: null,
    setGroupOrderList: action((state, payload) => {
        state.groupOrderList = payload;
    }),
    removeFromGroupOrderList: action((state, payload) => {
        state.groupOrderList = state.groupOrderList.filter(item => item.id !== payload)
    }),


}