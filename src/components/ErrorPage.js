import React from 'react'
import { motion } from 'framer-motion';

const ErrorPage = () => {
        return (
                <motion.div style={{ textAlign: 'center' }}
                        initial={{x: '-100vw'}}
                        animate={{x: 0}}
                        exit={{x: '100vw' ,transition: {type: 'just'}}}>
                        <motion.h1 className="page-error-heading" style={{
                                fontFamily: "sans-serif",
                                color: 'rgb(231, 141, 141)',
                                margin: '0 auto',
                                marginTop: '6rem'
                        }}>404 - Page Error</motion.h1>
                        <motion.span>This page either doesn't exist or is a priveleged page</motion.span>
                </motion.div>
        )
}

export default ErrorPage;
