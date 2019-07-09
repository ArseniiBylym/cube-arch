import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import {Spinner, DetailsPageHeader} from '../components/shared';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Group} from '../components/Groups'
import Divider from '@material-ui/core/Divider';
import {Particles} from '../components/shared'


import { Api } from '../api/index';
import {data} from '../data/index'

const Groups = () => {
    const [groups, setGroups] = useState(null);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const fetchedGroups = Api.getGroups();
       
        setGroups(fetchedGroups)
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.groups;
        setContent(content)
    }, [lang])

    const getGroups = () => {
        return groups.map((item, index) => {
            return (
                <Grid key={item.id} container className="Groups__elem" >
                    {index % 2 === 0 ? (
                        <>
                        <Grid item sm={12} md={10} className="Groups__item">
                            <Group {...item} dir="ltr"/>
                        </Grid>
                        <Grid item sm={false} md={2} />
                        <Divider />
                        </>
                    ) : (
                        <>
                        <Grid item sm={false} md={2} />
                        <Grid item sm={12} md={10} className="Groups__item">
                            <Group {...item} dir="rtl"/>
                        </Grid>
                        <Divider />
                        </>
                    )
                    }
                </Grid>
            )
        } )
    }


    if (!groups || !content) return <Spinner />;
    return (
        <>
            <Particles />
            <div className="PageDetails Groups">
                <DetailsPageHeader title={content.title} description={content.description} />
                <div className="PageDetails__list">{getGroups()}</div>
            </div>
        </>
    );
};

export default Groups;
