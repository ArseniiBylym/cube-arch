import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import {Spinner} from '../components/shared';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Group} from '../components/Groups'
import Divider from '@material-ui/core/Divider';


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
                <Grid item key={item.id} container >
                    {index % 2 === 0 ? (
                        <>
                        <Grid item sm={12} md={10} className="Groups__item">
                            <Group {...item} dir="ltr"/>
                        </Grid>
                        <Grid item sm={0} md={2} />
                        <Divider />
                        </>
                    ) : (
                        <>
                        <Grid item sm={0} md={2} />
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
        <div className="PageDetails Groups">
            <Grid container direction="row-reverse" className="PageDetails__header">
                <Grid className="PageDetails__header__text" item xs={12} sm={6} lg={4}>{content.title}</Grid>
            </Grid>
            <Container maxWidth="md" className="PageDetails__description">{content.description}</Container>
            <Grid container direction="column" spacing={10} className="PageDetails__list">{getGroups()}</Grid>
        </div>
    );
};

export default Groups;
