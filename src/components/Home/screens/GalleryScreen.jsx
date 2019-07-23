import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {LinkButton} from '../../shared';
import VisibilitySensor from 'react-visibility-sensor';

export const GalleryScreen = props => {
    const [visible, setVisible] = useState(false);

    const {text, linkUrl, linkText, className} = props;
    return (
        <div className={`GalleryScreen`}>
            <VisibilitySensor
                partialVisibility={true}
                active={!visible}
                onChange={isVisible => setVisible(isVisible)}
            >
                {({isVisible}) => (
                    <>
                        <div className={isVisible ? "images visible" : "images"}>
                            <Link to={linkUrl}>
                                <div className="image image-1" />
                            </Link>
                            <Link to={linkUrl}>
                                <div className="image image-2" />
                            </Link>
                            <Link to={linkUrl}>
                                <div className="image image-3" />
                            </Link>
                        </div>
                        <div className={isVisible ? "content visible" : "content"}>
                            <div className="text">{text}</div>
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
