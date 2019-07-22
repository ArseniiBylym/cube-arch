import React, {useState} from 'react';
import { IoIosArrowDown} from 'react-icons/io'
import { TestClassRegisterModal } from './../../modals';
import './styles.scss';

export const HomeScreen = props => {
    const [testRegisterModal, setTestRegisterModal] = useState(false);
    const {text, secondaryText, linkText, testClass} = props;
    return (
        <>
            <div className="HomeScreen">
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
                    <div className="button">{linkText}</div>
                    <div className="icon-container">
                        <IoIosArrowDown className="icon"/>
                    </div>
                </div>
            </div>
            <TestClassRegisterModal open={testRegisterModal} closeModal={() => setTestRegisterModal(false)} />
        </>
    );
};
