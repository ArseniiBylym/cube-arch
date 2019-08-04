import React from 'react';
import {LinkButton} from '../../shared';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VisibilitySensor from 'react-visibility-sensor';

export const ToursScreen = props => {
    const {text, linkUrl, linkText, className, header} = props;
    return (
        <div className={`ToursScreen ${className}`}>
            <Grid container spacing={0}>
                <VisibilitySensor
                    partialVisibility={true}
                    offset={{top: 0, bottom: 300}}
                >
                    {({isVisible}) => (
                        <Grid item xs={12} sm={4}>
                            <div className={isVisible ? "content visible" : "content"}>
                                <div className="header">{header}</div>
                                <div className="text" dangerouslySetInnerHTML={{__html: text}} />
                                <div className="link">
                                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                                </div>
                            </div>
                        </Grid>
                    )}
                </VisibilitySensor>
                <Grid item xs={12} sm={8} className="imageWrapper">
                    <Link to={linkUrl} className="image" />
                </Grid>
            </Grid>
        </div>
    );
};
