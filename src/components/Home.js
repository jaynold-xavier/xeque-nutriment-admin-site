import React from 'react'
import logo from '../icons/X.svg'
import { motion } from 'framer-motion'
import '../styles/home.css';

const Home = () => {
        const variants = {
                hidden: {
                        scale: 0,
                },
                visible: {
                        scale: 1,
                        transition: {
                                type: "tween",
                                duration: 1
                        }
                }
        }
        return (
                <motion.div className="welcome"
                        variants={variants}
                        initial={'hidden'}
                        animate={'visible'}
                        exit={{ x: '100vw', transition: { ease: "easeInOut" } }}>
                        <img src={logo} alt="logo_home" initial={'hidden'} />
                        <h1>WELCOME</h1>
                        <span>to the admin site</span>
                </motion.div>
        )
}

export default React.memo(Home);