import React from 'react';
import './styles.scss';
import logo from '../../../assets/icons/logo.svg';
import { IoIosArrowDown} from 'react-icons/io'

export const HomeScreen = props => {
    const {text, secondaryText, linkText, linkUrl, setActiveScreen} = props;
    return (
        <div className="HomeScreen">
            <div className="logo">
                <img className="image" src={logo} alt="" />
                <div className="title">Cube ARCH Club</div>
            </div>
            <div className="content">
                <div className="title">
                    <div className="info">{text}</div>
                    <div className="secondaryInfo">{secondaryText}</div>
                </div>
            </div>
            <div className="next">
                <a onClick={() => setActiveScreen(1)} href={`#${linkUrl}`} className="button">{linkText}</a>
                <a onClick={() => setActiveScreen(1)} href={`#${linkUrl}`} className="icon-container">
                    <IoIosArrowDown className="icon"/>
                </a>
            </div>
        </div>
    );
};
