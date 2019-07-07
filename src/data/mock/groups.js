export const groups = [
        {
            id: 0,
            name: {
                en: 'Some group name',
                ukr: 'Назва групи'
            },
            startDate: "2019, 8, 1",
            duration: 10,
            available: false,
            price: 1500,
            description: {
                en: "Some description about this group.Some description about this group.Some description about this group.",
                ukr: 'Інформація про цю группу. Інформація про цю группу.Інформація про цю группу.'
            },
            imageUrl:"https://images.squarespace-cdn.com/content/54c6698de4b0b3bd472b8987/1423679002310-O4HJKGXEY7U1XPB4BTER/?content-type=image%2Fjpeg",
            programs: [
                {
                    name: {
                        en: 'First program name',
                        urk: 'Назва першої программи'
                    }, 
                    linkUrl: '/programs/#0'
                },
                {
                    name: {
                        en: 'Second program name',
                        urk: 'Назва другої програми'
                    }, 
                    linkUrl: '/programs/#1'
                },
            ]
        },
        {
            id: 1,
            name: {
                en: 'Some group name #2',
                ukr: 'Назва групи №2'
            },
            startDate: "2019, 10, 3",
            duration: 5,
            available: true,
            price: 1000,
            description: {
                en: "Some description about this group.Some description about this group.Some description about this group.",
                ukr: 'Інформація про цю группу. Інформація про цю группу.Інформація про цю группу.'
            },
            imageUrl:"http://www.kaleidoscopekid.com/wp-content/uploads/2016/04/istock_000020475581medium-1024x729.jpg",
            programs: [
                {
                    name: {
                        en: 'First program name',
                        urk: 'Назва першої программи'
                    }, 
                    linkUrl: '/programs/#0'
                },
            ]
        },
      ]
