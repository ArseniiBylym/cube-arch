import React, {useState} from 'react';
import {IoIosArrowDown} from 'react-icons/io';
import {TestClassRegisterModal} from './../../modals';
import './styles.scss';

export const HomeScreen = props => {
    const [testRegisterModal, setTestRegisterModal] = useState(false);
    const {text, secondaryText, testClass, nextScreenTitle} = props;
    return (
        <>
            <div className="HomeScreen">
                <div className="content">
                    <div className="title">
                        <div className="info">
                            <pre>{text}</pre>
                        </div>
                        <div
                            className="secondaryInfo"
                            dangerouslySetInnerHTML={{__html: secondaryText}}
                        />
                    </div>
                    <div className="subscribe">
                        <div
                            className="testRegisterButton"
                            onClick={() => setTestRegisterModal(true)}
                        >
                            {testClass}
                        </div>
                    </div>
                </div>
                <div className="next">
                    <div className="button">{nextScreenTitle}</div>
                    <div className="icon-container">
                        <IoIosArrowDown className="icon" />
                    </div>
                </div>
            </div>
            <TestClassRegisterModal
                open={testRegisterModal}
                closeModal={() => setTestRegisterModal(false)}
            />
        </>
    );
};
