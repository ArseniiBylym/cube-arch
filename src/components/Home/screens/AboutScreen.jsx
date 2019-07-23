import React, {useState} from 'react';
import {LinkButton} from '../../shared';
import {Link} from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

export const AboutScreen = props => {
    const [visible, setVisible] = useState(false);

    const {text, linkUrl, linkText} = props;
    return (
        <div className="AboutScreen">
            <Link to={linkUrl} className="image" />
            <VisibilitySensor
                partialVisibility={true}
                active={!visible}
                onChange={isVisible => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <div className={isVisible ? "content visible" : "content"}>
                        <div className="text">{text}</div>
                        <div className="link">
                            <LinkButton linkText={linkText} linkUrl={linkUrl} />
                        </div>
                    </div>
                )}
            </VisibilitySensor>
        </div>
    );
};
