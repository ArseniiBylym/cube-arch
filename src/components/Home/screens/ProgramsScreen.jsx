import React, {useState, useEffect} from 'react';
import {LinkButton} from '../../shared';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import VisibilitySensor from 'react-visibility-sensor';
import {IoIosArrowDown} from 'react-icons/io';
import image from '../../../assets/images/home/programs-min.jpg'

export const ProgramsScreen = props => {
    const {text, linkUrl, linkText, nextScreenTitle, header} = props;
    return (
        <div className={`ProgramsScreen`}>
            <VisibilitySensor
                partialVisibility={true}
                offset={{top: 0, bottom: 300}}
                // active={!visible}
                // onChange={isVisible => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4}>
                            <div className={isVisible ? 'content visible' : 'content'}>
                                <div className="header">{header}</div>
                                <div className="text"><pre>{text}</pre></div>
                                <div className="link">
                                    <LinkButton linkText={linkText} linkUrl={linkUrl} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8} className={isVisible ? "imageContainer visible" : "imageContainer"}>
                            <Link to={linkUrl} className="image" />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            justify="flex-end"
                            direction="column"
                            wrap="nowrap"
                            alignItems="center"
                            className="ProgramsScreen__footer"
                        >
                            <div className="button">{nextScreenTitle}</div>
                            <div className="icon-container">
                                <IoIosArrowDown className="icon" />
                            </div>
                        </Grid>
                    </Grid>
                )}
            </VisibilitySensor>
        </div>
    );
};
