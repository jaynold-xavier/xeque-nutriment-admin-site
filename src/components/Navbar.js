import React from 'react';
import logo from '../icons/X.svg'
import menu from '../icons/menu.svg'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import '../styles/navbar.css';

const Navbar = ({user}) => {
        const u = user && (user.displayName || user.email)?.substr(0, 1).toUpperCase()
        const links = user ? <SignedInLinks u={u}/> : <SignedOutLinks/>;
        return (
                <motion.header className="navbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <label htmlFor="menu-button">
                                <img src={menu} className="menu-icon" alt="logo" />
                        </label>
                        <input type="checkbox" id="menu-button" value="checkedValue" />
                        <ul className="navbar-nav">
                                <li className="nav-item">
                                        <NavLink exact to="/">
                                                <img src={logo} className="logo" alt="logo" style={{ marginRight: '10px' }} />
                                                <span className="link-text">Xeque Nutriment</span>
                                        </NavLink>
                                </li>
                                {links}
                        </ul>
                </motion.header>

        )
}
export default Navbar;