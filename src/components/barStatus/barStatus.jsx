import React from 'react';
import './barStatus.css'

const BarStatus = ({ status }) => {


    return (
        <div>
            <div className='bar-number'>
                <p>0</p>
                <p>50</p>
                <p>100</p>
            </div>
            <div className='bar-status-container'>
                <div className="progress-bar" style={{ width: status }}>

                </div>
            </div>
            <p className='bar-percentage'>%</p>

        </div >

    );
}

export default BarStatus;
