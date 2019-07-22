import React from 'react';
import Grid from '@material-ui/core/Grid'
import './styles.scss';

export const InfoScreen = props => {
    const {text, className} = props;
    return (
        <div className={`InfoScreen ${className}`}>
            <div className='wrapper'>
                <Grid container spacing={4}>
                    {text.map(item => (
                        <Grid key={item.title} item xs={12} sm={6} md={3} className="element">
                            <div className="title">{item.title}</div>
                            <div className="subtitle">{item.subtitle}</div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};
