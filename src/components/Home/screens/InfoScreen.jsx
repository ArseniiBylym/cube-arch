import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {IoIosArrowDown} from 'react-icons/io';
import {useTrail, animated} from 'react-spring'


import './styles.scss';
import VisibilitySensor from 'react-visibility-sensor';

export const InfoScreen = props => {
    const [visible, setVisible] = useState(false)
    const {header, subHeader, text, nextScreenTitle} = props;
    const trails = useTrail(text.length, {opacity: visible ? 1 : 0, y: visible ? `0px` : `50px`}); 
    return (
        <div className='InfoScreen'>
            <VisibilitySensor 
                partialVisibility={true}
                offset={{top: 0, bottom: 300}}
                // active={!visible}
                onChange={(isVisible) => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <Grid container className="InfoScreen__content" justify="center" direction="column" wrap="nowrap" style={{height: '100%'}}>
                        <Grid item xs={12} container alignItems="flex-end" justify="center">
                            <div className="InfoScreen__header">{header}</div>
                        </Grid>
                        <Grid item xs={12} container justify="center" alignItems="center"  >
                            <div className="InfoScreen__subHeader" dangerouslySetInnerHTML={{__html: subHeader}} />
                        </Grid>
                        <Grid item xs={12} className="wrapper">
                            <Grid container spacing={4}>
                                {text.map((item, index) => (
                                    <Grid
                                        key={item.title}
                                        item
                                        xs={12}
                                        sm={4}
                                        className="element"
                                    >
                                        <animated.div style={{
                                            opacity: trails[index].opacity,
                                            transform: trails[index].y.interpolate(value => `translate3d(0, ${value}, 0)`)
                                        }}>
                                            <div className="title">{item.title}</div>
                                            <div className="subtitle">{item.subtitle}</div>
                                        </animated.div>
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
