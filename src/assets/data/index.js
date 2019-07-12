export const data = {
    core: {
        contacts: {
            facebook: "https://www.facebook.com/cube.arch.club/",
            google: "someemail@gmail.com",
            instagram: "instagramAccound",
            twitter: "twitterAccount",
            phones: [
                "+380971234567",
                "+380667123434",
            ],
            address: {
                en: "Ukrain, Kyiv, Nezalezhosti st, 22",
                ukr: "Україна, Київ, вул. Незалежності, 22",
            },
            email: "someemail@gmail.com",
        }
    },
    lang: {
        en: {
            pages: {
                home: {
                    main: {
                        
                    },
                    nav: [
                        {index: 0, name: "home", linkUrl: "/home"},
                        {index: 1, name: "groups", linkUrl: "/groups"},
                        {index: 2, name: "programs", linkUrl: "/programs"},
                        {index: 3, name: "classes", linkUrl: "/classes"},
                        {index: 4, name: "tours", linkUrl: "/tours"},
                        {index: 5, name: "gallery", linkUrl: "/gallery"},
                        {index: 6, name: "articles", linkUrl: "/articles"},
                        {index: 7, name: "about", linkUrl: "/about"},
                        {index: 8, name: "contacts", linkUrl: "/contacts"},

                    ],
                    screens: [
                        {index: 0, name: "home", linkText: "continue", linkUrl: "groups", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 1, name: "groups", linkText: "details", linkUrl: "/groups", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 2, name: "programs", linkText: "details", linkUrl: "/programs", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 3, name: "classes", linkText: "details", linkUrl: "/classes", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 4, name: "tours", linkText: "details", linkUrl: "/tours", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 5, name: "gallery", linkText: "to the gallery", linkUrl: "/gallery", text: "Go to the gallery to see photoes from owr master classes and another events"},
                        {index: 6, name: "articles", linkText: "articles", linkUrl: "/articles", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus"},
                        {index: 7, name: "about", linkText: "about us", linkUrl: "/about",  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus facere maxime nulla excepturi provident enim totam. Error, laboriosam veritatis."},
                        {index: 8, name: "contacts", linkText: "contacts", linkUrl: "/contacts", address: "Ukrain, Kyiv, Nezalezhosti st, 22", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus"},
                    ]
                },
                groups: {
                    title: "Groups",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                    details: {
                        date: "Learning period",
                        duration: "Classes ammount",
                        places: "Available places",
                        price: "Price",
                        program: {
                            title: "Learning program",
                            tooltip: "Read more"
                        },
                        apply: "Register",
                        closed: "Registration ended",
                    },
                },
                programs: {
                    title: "Programs",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                },
                classes: {
                    title: "Classes",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                    details: {
                        apply: "Register",
                        closed: "Registration ended",
                        order: "Order class",
                        price: "Price of master-class",
                        duration: "Duration of master-class",
                        auditory: "Auditory",
                        tooltip: "Classes list",

                    }
                },
                tours: {
                    title: "Tours",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                    details: {
                        apply: "Register",
                        closed: "Registration ended",
                        order: "Order tour",
                        select: "Select tour",
                        price: "Tour's price",
                        duration: "Tour's duration",
                        auditory: "Auditory",
                        tooltip: "Tours list",
                    }
                },
                gallery: {
                    title: "Gallery",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                },
                articles: {
                    title: "Articles",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                },
                about: {
                    title: "About us",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam libero nemo sint quasi at voluptatum, dolore rem, rerum cupiditate eos, ipsa sapiente accusamus! Ad sint fuga maiores repellendus incidunt nisi!",
                    users: [
                        {
                            id: 0,
                            name: "Daryna Pasyuta",
                            info: "Some info about you. Some info about you.Some info about you.Some info about you. Some info about you.Some info about you. Some info about you.Some info about you. Some info about you.Some info about you. Some info about you.Some info about you.",
                            image: "https://scontent.fiev19-1.fna.fbcdn.net/v/t1.0-9/43879435_2208384116042130_1921172724433027072_n.jpg?_nc_cat=105&_nc_oc=AQlhM7qgAdcDwmqjDkoUTTHOf1RkLg_GWtvGHGMSgVRJspSxo4LL-tJjxkNUToLnAVQ&_nc_ht=scontent.fiev19-1.fna&oh=c14f553525678a91a6d737b74484119c&oe=5DB2398B",
                            socials: {
                                facebook: "https://www.facebook.com/cube.arch.club/",
                                google: "someemail@gmail.com",
                                instagram: "instagramLink"
                            }
                        },
                        {
                            id: 1,
                            name: "Olga",
                            info: "Some info about you. Some info about you.Some info about you.Some info about you. Some info about you.Some info about you. Some info about you.Some info about you. Some info about you.Some info about you. Some info about you.Some info about you.",
                            image: "https://scontent.fiev19-1.fna.fbcdn.net/v/t1.0-9/60930031_360993671512378_8109004147266682880_n.jpg?_nc_cat=106&_nc_oc=AQlgTQPRekPGDuE_Umcypo9_i3Fw_Txk6U1oZEUlTwSw2HRuVjmLRIEgNV65allOWVs&_nc_ht=scontent.fiev19-1.fna&oh=fd32c2ca8601229df7146e36afb6cb8a&oe=5DBD09E9",
                            socials: {
                                facebook: "https://www.facebook.com/cube.arch.club/",
                                google: "someemail@gmail.com",
                                instagram: "instagramLink"
                            }
                        }
                    ]
                },
                contacts: {
                    title: "Contacts",
                    description: '',
                }
            }
        },
        ukr: {
            pages: {
                home: {
                    main: {

                    },
                    nav: [
                        {index: 0, name: "головна", linkUrl: "/home"},
                        {index: 1, name: "набір у групи", linkUrl: "/groups"},
                        {index: 2, name: "програми", linkUrl: "/programs"},
                        {index: 3, name: "майстер-класи", linkUrl: "/classes"},
                        {index: 4, name: "екскурсії", linkUrl: "/tours"},
                        {index: 5, name: "галерея", linkUrl: "/gallery"},
                        {index: 6, name: "статті", linkUrl: "/articles"},
                        {index: 7, name: "про нас", linkUrl: "/about"},
                        {index: 8, name: "контакти", linkUrl: "/contacts"}
                    ],
                    screens: [
                        {index: 0, name: "головна", linkText: "продовжити", linkUrl: "groups", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення"},
                        {index: 1, name: "набір у групи", linkText: "докладніше", linkUrl: "/groups", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 2, name: "програми", linkText: "докладніше", linkUrl: "/programs", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 3, name: "майстер-класи", linkText: "докладніше", linkUrl: "/classes", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 4, name: "екскурсії", linkText: "докладніше", linkUrl: "/tours", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 5, name: "галерея", linkText: "до галереї", linkUrl: "/gallery", text: "Роботи наших учнів, фото з майстер классів та інших заходів"},
                        {index: 6, name: "статті", linkText: "статті", linkUrl: "/articles", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 7, name: "про нас", linkText: "про нас", linkUrl: "/about", address: "Україна, Київ, вул. Незалежності, 22", "text": "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 8, name: "контакти", linkText: "контакти", linkUrl: "/contacts", address: "Україна, Київ, вул. Незалежності, 22", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                    ]
                },
                groups: {
                    title: "Групи",
                    description: "Якщо потрібно, тут буде більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут буде більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут буде більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                    details: {
                        date: "Період навчання",
                        duration: "Кількість занять",
                        places: "Залишилось місць",
                        price: "Вартість",
                        program: {
                            title: "Програма навчання",
                            tooltip: "Докладніше"
                        },
                        apply: "Реєстрація",
                        closed: "Реєстрацію завершено",
                    }
                },
                programs: {
                    title: "Програми",
                    description: "Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                },
                classes: {
                    title: "Майстер-класи",
                    description: "Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                    details: {
                        apply: "Реєстрація",
                        closed: "Реєстрацію завершено",
                        order: "Замовити майстер-клас",
                        price: "Вартість майстер-класу",
                        duration: "Тривалість майстер-класу",
                        auditory: "Для кого",
                        tooltip: "Перелік майстер-класів"
                    },
                },
                tours: {
                    title: "Екскурсії",
                    description: "Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                    details: {
                        apply: "Реєстрація",
                        closed: "Реєстрацію завершено",
                        order: "Замовити екскурсію",
                        select: "Обрати екскурсію",
                        price: "Вартість екскурсії",
                        duration: "Тривалість єкскурсії",
                        auditory: "Для кого",
                        tooltip: "Перелік екскурсій"
                    },
                },
                gallery: {
                    title: "Галерея",
                    description: "Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                },
                articles: {
                    title: "Статті",
                    description: "Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                },
                about: {
                    title: "Про нас",
                    description: "Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ. Якщо потрібно, тут більш детальна, ніж на головній сторінці, інформація про цей розділ.",
                    users: [
                        {
                            id: 0,
                            name: "Дарина Пасюта",
                            info: "Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе.  Інформація про тебе. Інформація про тебе. Інформація про тебе.  Інформація про тебе. Інформація про тебе. Інформація про тебе. ",
                            image: "https://scontent.fiev19-1.fna.fbcdn.net/v/t1.0-9/43879435_2208384116042130_1921172724433027072_n.jpg?_nc_cat=105&_nc_oc=AQlhM7qgAdcDwmqjDkoUTTHOf1RkLg_GWtvGHGMSgVRJspSxo4LL-tJjxkNUToLnAVQ&_nc_ht=scontent.fiev19-1.fna&oh=c14f553525678a91a6d737b74484119c&oe=5DB2398B",
                            socials: {
                                facebook: "https://www.facebook.com/cube.arch.club/",
                                google: "someemail@gmail.com",
                                instagram: "instagramLink"
                            }
                        },
                        {
                            id: 1,
                            name: "Ольга",
                            info: "Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. Інформація про тебе. ",
                            image: "https://scontent.fiev19-1.fna.fbcdn.net/v/t1.0-9/60930031_360993671512378_8109004147266682880_n.jpg?_nc_cat=106&_nc_oc=AQlgTQPRekPGDuE_Umcypo9_i3Fw_Txk6U1oZEUlTwSw2HRuVjmLRIEgNV65allOWVs&_nc_ht=scontent.fiev19-1.fna&oh=fd32c2ca8601229df7146e36afb6cb8a&oe=5DBD09E9",
                            socials: {
                                facebook: "https://www.facebook.com/cube.arch.club/",
                                google: "someemail@gmail.com",
                                instagram: "instagramLink"
                            }
                        }
                    ]
                },
                contacts: {
                    title: 'Контакти',
                    description: '',
                }
            }
        }
    }
};
