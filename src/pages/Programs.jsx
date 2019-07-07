// import React, {useState, useEffect} from 'react';

// const Programs = () => {
//     return (
//         <div className="Programs">
//             <h3>Programs component</h3>
//         </div>
//     );
// };

// export default Programs;

import React, {useState, useEffect} from 'react';
import {useStoreState} from 'easy-peasy';
import {Spinner} from '../components/shared';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { Api } from '../api/index';
import {data} from '../data/index'

const Programs = () => {
    const [programs, setPrograms] = useState(null);
    const [content, setContent] = useState(null);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        const fetchedPrograms = Api.getPrograms();
       
        setPrograms(fetchedPrograms)
    }, [])
    useEffect(() => {
        const content = data.lang[lang].pages.programs;
        setContent(content)
    }, [lang])


    if (!programs || !content) return <Spinner />;
    return (
        <div className="PageDetails Programs">
            <Grid container direction="row-reverse" className="PageDetails__header">
                <Grid className="PageDetails__header__text" item xs={12} sm={6} lg={4}>{content.title}</Grid>
            </Grid>
            <Container maxWidth="md" className="PageDetails__description">{content.description}</Container>
            <Grid container direction="column" className="PageDetails__list"></Grid>
        </div>
    );
};

export default Programs;

