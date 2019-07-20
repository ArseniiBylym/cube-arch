import darynaImage from '../images/profile/daryna_profile.jpg';
import olgaImage from '../images/profile/olga.jpg';

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
    modals: {
        buttons: {
            confirm: {
                en: 'Confirm',
                ukr: 'Підтвердити',
            },
            cancel: {
                en: 'Cancel',
                ukr: 'Скасувати',
            }
        },
        subscribe: {
            en: {
                title: 'Leave your contacts to get information about future events.',
                email: 'Email',
                name: 'Name, surname of contact person',
                phone: 'Phone number',
                confirmMessage: 'Thank you! We will inform you about future events, wich could be interesting for you.'
            },
            ukr: {
                title: `Залиште Ваші контактні данні для того, щоб отримувати сповіщення про майбутні події`,
                email: `Електронна адреса`,
                name: `Прізвище, ім'я контактної особи`,
                phone: `Телефон`,
                confirmMessage: `Дякуємо! Ми повідомимо Ваc про майбутні події, що можуть бути цікавими для Вас.`
            }
        },
        confirmMessage: {
            en: `Thanks for your order! We'll contact you in the shortest possible time.`,
            ukr: `Дякуємо за Ваше замовлення! Ми зв'яжемося з Вами у найкоротший термін.`
        }, 
        groupRegister: {
            en: {
                email: 'Email',
                name: 'Name, surname of contact person',
                phone: 'Phone number',
                children: 'Number of children, theirs names and ages',
                reason: 'What interested you in the program? What are you waiting for?',
                sourse: 'Where did you find out about us?'
            },
            ukr: {
                email: `Електронна адреса`,
                name: `Прізвище, ім'я контактної особи`,
                phone: `Телефон`,
                children: `Кількість дітей, їх вік, ім'я`,
                reason: `Що Вас зацікавило у програмі? Що очікуєте?`,
                sourse: `Звідки дізналися про нас? `
            }
        },
        classRegister: {
            en: {
                email: 'Email',
                name: 'Name, surname of contact person',
                phone: 'Phone number',
                children: 'Number of children, theirs names and ages',
                reason: 'What interested you in the class? What are you waiting for?',
                sourse: 'Where did you find out about us?'
            },
            ukr: {
                email: `Електронна адреса`,
                name: `Прізвище, ім'я контактної особи`,
                phone: `Телефон`,
                children: `Кількість дітей, їх вік, ім'я`,
                reason: `Що Вас зацікавило у майстер-класі? Що очікуєте?`,
                sourse: `Звідки дізналися про нас? `
            }
        },
        classOrder: {
            en: {
                datetime: 'Desired date and time',
                email: 'Email',
                name: 'Name, surname of contact person',
                phone: 'Phone number',
                children: 'Number of children, theirs names and ages',
                reason: 'What interested you in the class? What are you waiting for?',
                sourse: 'Where did you find out about us?'
            },
            ukr: {
                datetime: `Бажана дата та час`,
                email: `Електронна адреса`,
                name: `Прізвище, ім'я контактної особи`,
                phone: `Телефон`,
                children: `Кількість дітей, їх вік, ім'я`,
                reason: `Що Вас зацікавило у майстер-класі? Що очікуєте?`,
                sourse: `Звідки дізналися про нас? `
            }
        },
        tourRegister: {
            en: {
                email: 'Email',
                name: 'Name, surname of contact person',
                phone: 'Phone number',
                children: 'Number of children, theirs names and ages',
                reason: 'What interested you in the tour? What are you waiting for?',
                sourse: 'Where did you find out about us?'
            },
            ukr: {
                email: `Електронна адреса`,
                name: `Прізвище, ім'я контактної особи`,
                phone: `Телефон`,
                children: `Кількість дітей, їх вік, ім'я`,
                reason: `Що Вас зацікавило у єкскурсії? Що очікуєте?`,
                sourse: `Звідки дізналися про нас? `
            }
        },
        tourOrder: {
            en: {
                datetime: 'Desired date and time',
                email: 'Email',
                name: 'Name, surname of contact person',
                phone: 'Phone number',
                children: 'Number of children, theirs names and ages',
                reason: 'What interested you in the tour? What are you waiting for?',
                sourse: 'Where did you find out about us?'
            },
            ukr: {
                datetime: `Бажана датата час`,
                email: `Електронна адреса`,
                name: `Прізвище, ім'я контактної особи`,
                phone: `Телефон`,
                children: `Кількість дітей, їх вік, ім'я`,
                reason: `Що Вас зацікавило у єкскурсії? Що очікуєте?`,
                sourse: `Звідки дізналися про нас? `
            }
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
                        // empty link form info screen
                        {index: 2, name: "groups", linkUrl: "/groups"},
                        {index: 3, name: "programs", linkUrl: "/programs"},
                        {index: 4, name: "classes", linkUrl: "/classes"},
                        {index: 5, name: "tours", linkUrl: "/tours"},
                        {index: 6, name: "gallery", linkUrl: "/gallery"},
                        {index: 7, name: "articles", linkUrl: "/articles"},
                        {index: 8, name: "about", linkUrl: "/about"},
                        {index: 9, name: "contacts", linkUrl: "/contacts"},
                    ],
                    screens: [
                        {index: 0, name: "home", linkText: "continue", linkUrl: "groups", text: "Short title.", secondaryText: "Longer text. Longer text. Longer text. Longer text. Longer text. Longer text."},
                        {index: 1, name: "info", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia",},
                        {index: 2, name: "groups", linkText: "details", linkUrl: "/groups", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 3, name: "programs", linkText: "details", linkUrl: "/programs", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 4, name: "classes", linkText: "details", linkUrl: "/classes", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 5, name: "tours", linkText: "details", linkUrl: "/tours", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus."},
                        {index: 6, name: "gallery", linkText: "to the gallery", linkUrl: "/gallery", text: "Go to the gallery to see photoes from owr master classes and another events"},
                        {index: 7, name: "articles", linkText: "articles", linkUrl: "/articles", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus"},
                        {index: 8, name: "about", linkText: "about us", linkUrl: "/about",  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus facere maxime nulla excepturi provident enim totam. Error, laboriosam veritatis."},
                        {index: 9, name: "contacts", linkText: "contacts", linkUrl: "/contacts", address: "Ukrain, Kyiv, Nezalezhosti st, 22", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, dolore illum earum cumque aut atque quidem natus architecto distinctio accusamus"},
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
                        date: "Time and date",
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
                        date: "Time and date",
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
                            image: darynaImage,
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
                            image: olgaImage,
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
                        //empty link with 1 index for info screen
                        {index: 2, name: "набір у групи", linkUrl: "/groups"},
                        {index: 3, name: "програми", linkUrl: "/programs"},
                        {index: 4, name: "майстер-класи", linkUrl: "/classes"},
                        {index: 5, name: "екскурсії", linkUrl: "/tours"},
                        {index: 6, name: "галерея", linkUrl: "/gallery"},
                        {index: 7, name: "статті", linkUrl: "/articles"},
                        {index: 8, name: "про нас", linkUrl: "/about"},
                        {index: 9, name: "контакти", linkUrl: "/contacts"}
                    ],
                    screens: [
                        {index: 0, name: "головна", linkText: "продовжити", linkUrl: "groups", text: "Короткий заголовок", secondaryText: `Довгий заголовок. Довгий заголовок. Довгий заголовок. Довгий заголовок.`},
                        {index: 1, name: "інфо", text: "Якась коротка інформація про цей конкретний розділ.Якась коротка інформація про цей конкретний розділ. Якась коротка інформація про цей конкретний розділ. Якась коротка інформація про цей конкретний розділ."},
                        {index: 2, name: "набір у групи", linkText: "докладніше", linkUrl: "/groups", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 3, name: "програми", linkText: "докладніше", linkUrl: "/programs", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 4, name: "майстер-класи", linkText: "докладніше", linkUrl: "/classes", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 5, name: "екскурсії", linkText: "докладніше", linkUrl: "/tours", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 6, name: "галерея", linkText: "до галереї", linkUrl: "/gallery", text: "Роботи наших учнів, фото з майстер классів та інших заходів"},
                        {index: 7, name: "статті", linkText: "статті", linkUrl: "/articles", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 8, name: "про нас", linkText: "про нас", linkUrl: "/about", address: "Україна, Київ, вул. Незалежності, 22", "text": "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
                        {index: 9, name: "контакти", linkText: "контакти", linkUrl: "/contacts", address: "Україна, Київ, вул. Незалежності, 22", text: "Якась коротка інформація про цей конкретний розділ. Приблизно 2-3 речення."},
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
                        date: "Час проведення",
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
                        date: "Час початку",
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
                            image: darynaImage,
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
                            image: olgaImage,
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
