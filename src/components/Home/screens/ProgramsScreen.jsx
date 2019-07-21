import React from 'react';
import { LinkButton } from '../../shared';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

export const ProgramsScreen = props => {
    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`ProgramsScreen ${className}`}>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                    <div className="content">
                        <div className="text">{text}</div>
                        <div className="link">
                            <LinkButton linkText={linkText} linkUrl={linkUrl} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Link to={linkUrl} className="image"/>
                </Grid>
            </Grid>
        </div>
    )
}