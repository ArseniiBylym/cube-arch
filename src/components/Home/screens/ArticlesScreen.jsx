import React from 'react';
import { LinkButton } from '../../shared';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

export const ArticlesScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`ArticlesScreen ${className}`}>
            <Link to={linkUrl}>
            <Grid container className="ArticlesScreen__wrapper" direction="row-reverse" alignItems="flex-start">
                <Grid item xs={12} md={6} className="content__wrapper">
                    <div className="content">
                        <div className="text">{text}</div>
                        <div className="link">
                            <LinkButton linkText={linkText} linkUrl={linkUrl} />
                        </div>
                    </div>
                </Grid>
            </Grid>
            </Link>
        </div>
    )
}