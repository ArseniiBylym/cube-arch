import React, {useState} from 'react';
import './styles.scss';
import logo from '../../../assets/icons/logo.svg';
import { IoIosArrowDown} from 'react-icons/io'
import { TestClassRegisterModal } from './../../modals';

export const HomeScreen = props => {
    const [testRegisterModal, setTestRegisterModal] = useState(false);
    const {text, secondaryText, linkText, linkUrl, setActiveScreen, testClass} = props;
    return (
        <>
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
                <div className="subscribe">
                    <div className="testRegisterButton" onClick={() => setTestRegisterModal(true)}>{testClass}</div>
                </div>
            </div>
            <div className="next">
                <a onClick={() => setActiveScreen(1)} href={`#${linkUrl}`} className="button">{linkText}</a>
                <a onClick={() => setActiveScreen(1)} href={`#${linkUrl}`} className="icon-container">
                    <IoIosArrowDown className="icon"/>
                </a>
            </div>
        </div>
        <TestClassRegisterModal open={testRegisterModal} closeModal={() => setTestRegisterModal(false)} />
        </>
    );
};
