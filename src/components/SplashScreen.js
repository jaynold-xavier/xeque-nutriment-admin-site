import React from 'react'
import logo from '../icons/X.svg'

const SplashScreen = () => {
        return(
                <div className="splash-back">
                        <img src={logo} className="splash" alt="splashimage"></img>
                        <span>Xeque Nutriment</span>
                </div>
        )
};

export default SplashScreen;