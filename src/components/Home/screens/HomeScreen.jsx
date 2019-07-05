import React from 'react';
import './styles.scss';
import logo from '../../../assets/icons/logo.svg';
import { IoIosArrowDown} from 'react-icons/io'

export const HomeScreen = props => {
    console.log(props)
    const {index, name, text, linkText, linkUrl} = props;
    return (
        <div className="HomeScreen">
            <div className="logo">
                <img className="image" src={logo} alt="" />
                <div className="title">Cube Arch Club</div>
            </div>
            <div className="content">
                <div className="info">{text}</div>
            </div>
            <div className="next">
                <a href={`#${linkUrl}`} className="button">{linkText}</a>
                <a href={`#${linkUrl}`} className="icon-container">
                    <IoIosArrowDown className="icon"/>
                </a>
            </div>
        </div>
    );
};
