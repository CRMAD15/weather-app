import React from 'react';

import './loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <div className="ring"></div>
            <span className='loader-text'>loading...</span>
        </div>
    );
}

export default Loader;



