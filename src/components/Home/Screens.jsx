import React from 'react';
import {useStoreState} from 'easy-peasy';
import {
    HomeScreen,
    InfoScreen,
    ReviewsScreen,
    ClassesScreen,
    ProgramsScreen,
    ToursScreen,
    GalleryScreen,
    ArticlesScreen, 
    AboutScreen,
    ContactsScreen,
} from './screens/index';
import './styles.scss';
import {data} from '../../assets/data/index';

export const Screens = React.memo(props => {
    const lang = useStoreState(state => state.lang.current);
    const components = [
        HomeScreen, 
        InfoScreen, 
        ProgramsScreen, 
        ClassesScreen, 
        ReviewsScreen, 
        ToursScreen, 
        GalleryScreen, 
        ArticlesScreen, 
        AboutScreen, 
        ContactsScreen,
    ];

    const screens = components.map((Component, index) => {
        const key = data.lang[lang].pages.home.screens[index].name;
        const id = key;
        return (
            <div key={key} className="item" id={id} >
                <Component {...data.lang[lang].pages.home.screens[index]} />
            </div>
        )
    })

    return (
        <div className="Screens">
            {screens || null}
        </div>
    );
});
