import React from 'react'
import { motion } from 'framer-motion'

const Statistics = ({stats}) => {

        const stat_items = stats.map(v => {
                return (
                        <li className="stat-item" key={v.title}>
                                <span className="stat-anim"></span>
                                <span className="stat-num">{v.num}</span>
                                <small className="stat-text">{v.title}</small>
                        </li>
                )
        })
        return (
                <motion.div className="stats-area" 
                        initial={{x: '50vw'}}  
                        animate={{x: 0}}
                        transition = {{type:"tween"}}
                        exit={{x: '50vw', transition: {ease: "easeInOut"}}}>
                                <ul className="stats">
                                        {stat_items}
                                </ul>
                        </motion.div>
        )
}
export default Statistics;