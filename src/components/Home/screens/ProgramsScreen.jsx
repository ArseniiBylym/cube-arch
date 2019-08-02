import React, {useState} from 'react';
import {LinkButton} from '../../shared';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VisibilitySensor from 'react-visibility-sensor';
import {IoIosArrowDown} from 'react-icons/io';

export const ProgramsScreen = props => {
    const [visible, setVisible] = useState(false);
    const {text, linkUrl, linkText, nextScreenTitle, header} = props;
    return (
        <div className={`ProgramsScreen`}>
            <Grid container spacing={0}>
                <VisibilitySensor
                    partialVisibility={true}
                    active={!visible}
                    onChange={isVisible => setVisible(isVisible)}
                >
                    {({isVisible}) => (
                        <Grid item xs={12} sm={4}>
                            <div className={isVisible ? "content visible" : "content"}>
                                <div className="header">{header}</div>
                                <div className="text"><pre>{text}</pre></div>
                                <div className="link">
                                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                                </div>
                            </div>
                        </Grid>
                    )}
                </VisibilitySensor>
                <Grid item xs={12} sm={8}>
                    <Link to={linkUrl} className="image" />
                </Grid>
                <Grid item xs={12} container justify="flex-end" direction="column" wrap="nowrap" alignItems="center" className="ProgramsScreen__footer" >
                    <div className="button">{nextScreenTitle}</div>
                    <div className="icon-container">
                        <IoIosArrowDown className="icon" />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
