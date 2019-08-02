import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import styles from './PageTitle.module.scss';

export const PageTitle = ({title, description}) => {
    return (
        <>
            <Grid container direction="row-reverse" className={styles.header}>
                <Grid className={styles.title} item xs={12} sm={6} lg={4}>
                    {title}
                </Grid>
            </Grid>
            {/* <Container maxWidth="md" className={styles.subHeader}>
                {description}
            </Container> */}
        </>
    );
};
