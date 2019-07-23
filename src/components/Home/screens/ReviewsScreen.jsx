import React, {useState} from 'react';
import './styles.scss';
import Grid from '@material-ui/core/Grid';
import VisibilitySensor from 'react-visibility-sensor';

export const ReviewsScreen = props => {
    const [visible, setVisible] = useState(false);
    const {text, className} = props;
    return (
        <div className={`ReviewsScreen`}>
            <VisibilitySensor
                partialVisibility={true}
                active={!visible}
                onChange={isVisible => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <Grid container spacing={4} className={isVisible ? "wrapper visible" : "wrapper"}>
                        {text.map(item => (
                            <Grid
                                key={item.name}
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className="element"
                                container
                                direction="row"
                                alignContent="flex-start"
                                alignItems="center"
                                justify="center"
                            >
                                <Grid item xs={2} className="reviewPhoto">
                                    <a
                                        href={item.profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div
                                            className="photoUrl"
                                            style={{backgroundImage: `url(${item.photoUrl})`}}
                                        />
                                    </a>
                                </Grid>
                                <Grid item xs={6} className="name">
                                    <a
                                        href={item.profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.name}
                                    </a>
                                </Grid>
                                <Grid item xs={12} className="review">
                                    <a
                                        href={item.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.review}
                                    </a>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </VisibilitySensor>
        </div>
    );
};
