import React, {useState, useEffect} from 'react';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Grid from '@material-ui/core/Grid';
import {Spinner, PageTitle} from '../../../components/shared';
import {Program} from '../../../components/Programs'
import {Api} from '../../../api/index';
import {data} from '../../../assets/data/index'
import styles from './styles/Programs.module.scss';
import {Link} from 'react-router-dom';

const Programs = (props) => {
    const [content, setContent] = useState(null);
    const programs = useStoreState(state => state.content.programs);
    const setPrograms = useStoreActions(state => state.content.setPrograms);
    const lang = useStoreState(state => state.lang.current);

    useEffect(() => {
        if(!programs) {
            fetchPrograms();
        }
    }, [])

    useEffect(() => {
        const content = data.lang[lang].pages.programs;
        setContent(content)
    }, [lang])

    useEffect(() => {
        setTimeout(() => {
            const id = props.location.search.split('=')[1];
            if (id) {
                const elem = document.getElementById(id);
                elem.scrollIntoView();
            }
        }, 200)
    }, [])

    const fetchPrograms = async() => {
        try {
            const snapshot = await Api.programs.getAll();
            let programs = [];
            snapshot.forEach(doc => {
                programs.push({...doc.data(), id: doc.id})
            });
            setPrograms(programs)
        } catch (error) {
            console.log(error)
        }
    }


    // const getPrograms = () => {
    //     return (
    //         <div className={styles.programs}>
    //             {programs.map((item, index) => (
    //                     <Grid key={item.id} item sm={12}>
    //                         <Program {...item} index={index}/>
    //                     </Grid>
    //             ))}
    //         </div>
    //     )
    // }
    const getPrograms = () => {
        return (
            <Grid container spacing={6}>
                {programs.map(item => (
                    <Grid key={item.id} item xs={12} sm={6} className={styles.program}>
                        <Link to={`/programs/${item.id}`}>

                        <div className={styles.program__container}>
                            <div className={styles.program__image} style={{backgroundImage: `url(${item.image})`}}>
                                <div className={styles.program__info}>Start date, price or something else</div>
                            </div>
                            <div className={styles.program__name}>{item.name[lang]}</div>
                        </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (!programs || !content) return <Spinner />;
    return (
        <div className={styles.root}>
            {/* <PageTitle title={content.title} description={content.description} /> */}
            <PageTitle title={content.title} description={''} />
            {getPrograms()}
            <div className={styles.compare}>
                <div className={styles.compare__title}>Порівняти курси</div>
                <img src="https://thulitables.com/wp-content/uploads/2015/10/comparison-chart-all-tables.jpg" alt='' className={styles.compare__image} />
            </div>
        </div>
    );
};

export default Programs;

