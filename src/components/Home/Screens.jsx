import React from 'react';
import {useStoreState} from 'easy-peasy';
import classNames from 'classnames';
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

export const Screens = props => {
    const {activeScreen} = props;
    const lang = useStoreState(state => state.lang.current);
    const components = [
        HomeScreen, 
        InfoScreen, 
        ProgramsScreen, 
        ReviewsScreen, 
        ClassesScreen, 
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
            <div key={key} className={classNames('item', {active: activeScreen === index})} id={id} >
                <Component className={activeScreen === index ? 'active': ''} {...data.lang[lang].pages.home.screens[index]} />
            </div>
        )
    })

    return (
        <div className="Screens">
            {screens || null}
        </div>
    );
};
