import React from 'react';
import {useStoreState} from 'easy-peasy';
import {
    HomeScreen,
    GroupsScreen,
    ClassesScreen,
    ProgramsScreen,
    ToursScreen,
    GalleryScreen,
    AboutScreen,
} from './screens/index';
import './styles.scss';
import {data} from './../../data/index';

export const Screens = props => {
    const lang = useStoreState(state => state.lang.current);
    const components = [HomeScreen, GroupsScreen, ClassesScreen, ProgramsScreen, ToursScreen, GalleryScreen, AboutScreen];

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
};
