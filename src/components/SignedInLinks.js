import React from 'react';
import { NavLink } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase';

const SignedInLinks = ({ u }) => {
        const firebase = useFirebase();
        function logout() {
                firebase.auth().signOut()
                        .then(() => {
                                firebase.logout()
                                        .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
        }
        return (
                <>
                        <li className="nav-item">
                                <NavLink to="/dashboard">
                                        <span className="link-text">Dashboard</span>
                                </NavLink>
                        </li>
                        <li className="nav-item">
                                <a href="/" onClick={logout}>
                                        <span className="link-text" style={{ cursor: "pointer" }}>Logout</span>
                                </a>
                        </li>
                        <div className="user-logo">{u}</div>
                </>
        )
}

export default React.memo(SignedInLinks);