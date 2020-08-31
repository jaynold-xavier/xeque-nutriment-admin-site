import React from 'react';
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
        return (
                <>
                        <li className="nav-item">
                                <NavLink to="/login">
                                        <span className="link-text">Login</span>
                                </NavLink>
                        </li>
                        <li className="nav-item">
                                <NavLink to="/signup">
                                        <span className="link-text">Signup</span>
                                </NavLink>
                        </li>
                </>
        )
}

export default React.memo(SignedOutLinks);