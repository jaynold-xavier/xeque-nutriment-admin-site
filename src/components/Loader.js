import React from 'react'
import '../styles/loader.css';

const Loader = () => {
        return(
                <div className="loader-back">
                        <div className="loading"></div>
                        <span>Loading Data...</span>
                </div>
        )
}

export default Loader