import React from 'react';
import {LinkButton} from '../../shared';
import {Link} from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

export const AboutScreen = props => {

    const {linkUrl, linkText} = props;
    return (
        <div className="AboutScreen">
            <VisibilitySensor
                partialVisibility={true}
                offset={{top: 0, bottom: 300}}
            >
                {({isVisible}) => (
                    <>
                        <Link to={linkUrl} className="image" />
                        <div className={isVisible ? 'content visible' : 'content'}>
                            <div className="link">
                                <LinkButton linkText={linkText} linkUrl={linkUrl} />
                            </div>
                        </div>
                    </>
                )}
            </VisibilitySensor>
        </div>
    );
};
