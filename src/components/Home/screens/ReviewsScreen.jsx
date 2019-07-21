import React from 'react';
import './styles.scss';
import Grid from '@material-ui/core/Grid'

export const ReviewsScreen = props => {
    const {text, className} = props;
    return (
        <div className={`ReviewsScreen ${className}`}>
                <Grid container spacing={4} className="wrapper" alignItems="center">
                    {text.map(item => (
                        <Grid key={item.name} item xs={12} sm={6} md={6} className="element" container direction="column" alignItems="center">
                            <div className="photoUrl" style={{backgroundImage: `url(${item.photoUrl})`}} />
                            <Grid item xs={8} className="name">{item.name}</Grid >
                            <Grid item xs={8} className="review">{item.review}</Grid >
                        </Grid>
                    ))}
                </Grid>
        </div>
    );
};
