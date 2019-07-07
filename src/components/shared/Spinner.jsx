import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.scss';

export const Spinner  = () => {
    return (
        <div className="Spinner">
            <CircularProgress className="elem" classes={{
                svg: 'circle'
            }}/>
        </div>
    )
}