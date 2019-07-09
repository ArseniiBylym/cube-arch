import React from 'react';
import styles from './styles.module.scss';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export const DetailsPageHeader = ({title, description}) => {
    return (
        <>
            <Grid container direction="row-reverse" className={styles.title__wrapper}>
                <Grid className={styles.title} item xs={12} sm={6} lg={4}>
                    {title}
                </Grid>
            </Grid>
            <Container maxWidth="md" className={styles.description}>
                {description}
            </Container>
        </>
    );
};
