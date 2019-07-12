export const groups = [
        {
            id: 0,
            name: {
                en: 'Some group name',
                ukr: 'Назва групи'
            },
            startDate: new Date("2019, 8, 7"),
            endDate: new Date("2019, 10, 7"),
            places: 10,
            duration: 6,
            price: 1500,
            description: {
                en: "Some description about this group.Some description about this group.Some description about this group.",
                ukr: 'Інформація про цю группу. Інформація про цю группу.Інформація про цю группу.'
            },
            imageUrl:"https://images.squarespace-cdn.com/content/54c6698de4b0b3bd472b8987/1423679002310-O4HJKGXEY7U1XPB4BTER/?content-type=image%2Fjpeg",
            program: {
                    name: {
                        en: 'Program name',
                        ukr: 'Назва програми'
                    }, 
                    linkUrl: '/programs?id=0'
            },
        },
        {
            id: 1,
            name: {
                en: 'Some group name #2',
                ukr: 'Назва групи №2'
            },
            startDate: new Date("2019, 9, 8"),
            endDate: new Date("2019, 10, 8"),
            places: 0,
            duration: 8,
            price: 1000,
            description: {
                en: "Some description about this group.Some description about this group.Some description about this group.",
                ukr: 'Інформація про цю группу. Інформація про цю группу.Інформація про цю группу.'
            },
            imageUrl:"http://www.kaleidoscopekid.com/wp-content/uploads/2016/04/istock_000020475581medium-1024x729.jpg",
            program: {
                name: {
                    en: 'Program name',
                    ukr: 'Назва програми'
                }, 
                linkUrl: '/programs?id=1'
        },
        },
      ]
