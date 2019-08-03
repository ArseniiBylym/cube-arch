import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {IoIosArrowDown} from 'react-icons/io';
import {Trail, animated} from 'react-spring/renderprops'
import './styles.scss';
import VisibilitySensor from 'react-visibility-sensor';

export const InfoScreen = props => {
    useEffect(() => console.log('render'))
    const {header, subHeader, text, nextScreenTitle} = props;
    return (
        <div className='InfoScreen'>
            <VisibilitySensor 
                partialVisibility={true}
                offset={{top: 200, bottom: 300}}
            >
                {({isVisible}) => (
                    <Grid container className="InfoScreen__content" justify="center" direction="column" wrap="nowrap" style={{height: '100%'}}>
                        <Grid item xs={12} container alignItems="flex-end" justify="center">
                            <div className="InfoScreen__header">{header}</div>
                        </Grid>
                        <Grid item xs={12} container justify="center" alignItems="center"  >
                            <div className="InfoScreen__subHeader" dangerouslySetInnerHTML={{__html: subHeader}} />
                        </Grid>
                        <Grid item xs={12} className={isVisible ? "wrapper visible" : "wrapper"}>
                            <Grid container spacing={4}>
                                {text.map(item => (
                                    <Grid
                                        key={item.title}
                                        item
                                        xs={12}
                                        sm={4}
                                        className="element"
                                    >
                                        <div className="title">{item.title}</div>
                                        <div className="subtitle">{item.subtitle}</div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container justify="flex-end" direction="column" wrap="nowrap" alignItems="center" className="InfoScreen__footer" >
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
