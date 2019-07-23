import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import './styles.scss';
import VisibilitySensor from 'react-visibility-sensor';

export const InfoScreen = props => {
    const [visible, setVisible] = useState(false)
    const {text} = props;
    return (
        <div className={`InfoScreen`}>
            <VisibilitySensor 
                partialVisibility={true}
                active={!visible}
                onChange={(isVisible) => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <div className={isVisible ? "wrapper visible" : "wrapper"}>
                        <Grid container spacing={4}>
                            {text.map(item => (
                                <Grid
                                    key={item.title}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={3}
                                    className="element"
                                >
                                    <div className="title">{item.title}</div>
                                    <div className="subtitle">{item.subtitle}</div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                )}
            </VisibilitySensor>
        </div>
    );
};
