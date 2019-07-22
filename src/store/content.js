import {action} from 'easy-peasy';

export const content = {
    users: null,
    setUsers: action((state, payload) => {
        state.users = payload;
    }),
    deleteUser: action((state, payload) => {
        state.users = state.users.filter(item => item.id !== payload);
    }),

    usersTestClasses: null,
    setUsersTestClasses: action((state, payload) => {
        state.usersTestClasses = payload;
    }),
    deleteUserTestClasses: action((state, payload) => {
        state.usersTestClasses = state.usersTestClasses.filter(item => item.id !== payload);
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
    deleteClass: action((state, payload) => {
        state.classes = state.classes.filter(item => item.id !== payload);
    }),


    tours: null,
    setTours: action((state, payload) => {
        state.tours = payload;
    }),
    addTour: action((state, payload) => {
        state.tours.push(payload)
    }),
    updateTour: action((state, payload) => {
        state.tours = state.tours.map(item => {
           return (item.id === payload.id) ? payload : item
        });
    }),
    deleteTour: action((state, payload) => {
        state.tours = state.tours.filter(item => item.id !== payload);
    }),


    gallery: null,
    setGallery: action((state, payload) => {
        state.gallery = payload;
    }),
    addToGallery: action((state, payload) => {
        state.gallery.push(payload);
    }),
    removeFromGallery: action((state, payload) => {
        state.gallery = state.gallery.filter(item => item.id !== payload);
    }),


    articles: null,
    setArticles: action((state, payload) => {
        state.articles = payload;
    }),
    addArticle: action((state, payload) => {
        state.articles.push(payload);
    }),
    deleteArticle: action((state, payload) => {
        state.articles = state.articles.filter(item => item.id !== payload)
    })

}