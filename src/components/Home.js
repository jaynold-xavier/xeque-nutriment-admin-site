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
                exit={{x: '100vw', transition: {ease: "easeInOut"}}}>
                        <motion.img src={logo} alt="logo_home" initial={'hidden'}/>
                        <motion.h1>WELCOME</motion.h1>
                        <motion.h4>to the admin site</motion.h4>
                </motion.div>
        )
}

export default Home;