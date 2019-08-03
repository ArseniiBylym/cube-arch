import React, {useState} from 'react';
import {LinkButton} from '../../shared';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VisibilitySensor from 'react-visibility-sensor';

export const ClassesScreen = props => {
    // const [visible, setVisible] = useState(false)
    const {text, linkUrl, linkText, header} = props;
    return (
        <div className="ClassesScreen">
            <VisibilitySensor
                partialVisibility={true}
                offset={{top: 0, bottom: 300}}
                // active={!visible}
                // onChange={isVisible => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <Grid container spacing={0} className="wrapper">
                        <Grid item xs={12} sm={8} className={isVisible ? 'imageContainer visible' : 'imageContainer'}>
                            {/* <div className="imageDamper" /> */}
                            <Link to={linkUrl} className="image" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className={isVisible ? 'content visible' : 'content'}>
                                <div className="header">{header}</div>
                                <div className="text" dangerouslySetInnerHTML={{__html: text}} />
                                <div className="link">
                                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </VisibilitySensor>
        </div>
    );
};
