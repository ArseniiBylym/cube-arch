import React from 'react';
import {LinkButton} from '../../shared';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

export const ArticlesScreen = props => {
    const {linkUrl, linkText} = props;
    return (
        <div className={`ArticlesScreen`}>
            <Link to={linkUrl}>
                <Grid
                    container
                    className="ArticlesScreen__wrapper"
                    direction="row-reverse"
                >
                    <VisibilitySensor
                        partialVisibility={true}
                        offset={{top: 0, bottom: 300}}
                    >
                        {({isVisible}) => (
                            <Grid item xs={12} md={6} className="content__wrapper">
                                <div className={isVisible ? "content visible" : "content"}>
                                    <div className="link">
                                        <LinkButton linkText={linkText} color="secondary" />
                                    </div>
                                </div>
                            </Grid>
                        )}
                    </VisibilitySensor>
                </Grid>
            </Link>
        </div>
    );
};
