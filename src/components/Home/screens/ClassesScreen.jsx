import React, {useState} from 'react';
import { LinkButton } from '../../shared';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import VisibilitySensor from 'react-visibility-sensor';

export const ClassesScreen = props => {
    const [visible, setVisible] = useState(false)
    const {text, linkUrl, linkText} = props;
    return (
        <div className="ClassesScreen">
            <Grid container spacing={6}>
                <Grid item xs={12} sm={8}>
                    <Link to={linkUrl} className="image" />
                </Grid>
                    <VisibilitySensor
                        partialVisibility={true}
                        active={!visible} 
                        onChange={isVisible => setVisible(isVisible)}
                    >
                        {({isVisible}) => (
                            <Grid item xs={12} sm={4} container direction="column-reverse">
                                <div className={isVisible ? "content visible": "content"}>
                                    <div className="text">{text}</div>
                                    <div className="link">
                                        <LinkButton linkText={linkText} linkUrl={linkUrl} />
                                    </div>
                                </div>
                            </Grid>
                        )}
                    </VisibilitySensor>
            </Grid>
        </div>
    )
}