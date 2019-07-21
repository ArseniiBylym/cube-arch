import React from 'react';
import './styles.scss';
import Grid from '@material-ui/core/Grid'

export const InfoScreen = props => {
    const {text} = props;
    return (
        <div className="InfoScreen">
            <div className='wrapper'>
                <Grid container spacing={4}>
                    {text.map(item => (
                        <Grid key={item.title} item xs={12} sm={6} md={3}>
                            <div className="title">{item.title}</div>
                            <div className="subtitle">{item.subtitle}</div>
                        </Grid>
                    ))}
                </Grid>
            </div>
            {/* <div className="text">{text}</div> */}
        </div>
    );
};
