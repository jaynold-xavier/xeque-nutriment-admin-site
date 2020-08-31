import React, { useRef } from 'react'
import { motion, useElementScroll } from 'framer-motion';

const Orders = ({ items, setToggleOrderItem, setToggleAssign }) => {
        const ref = useRef()
        const {scrollY} = useElementScroll(ref)
        const order_items = Object.values(items).map(item => {
                const { id, orderedBy, orderDate } = item;
                const sec = new Date(orderDate.seconds * 1000).toDateString()
                return (
                        <li className="order-item" key={id}>
                                <div className="item-content">
                                        <span>Order ID:</span> {id}<br />
                                        <span>From:</span> {orderedBy}<br />
                                        <span>Date: </span>{sec}
                                </div>
                                <div className="actions">
                                        <button onClick={()=>setToggleOrderItem(item)}>View Details</button>
                                        <button onClick={()=>setToggleAssign(item)}>Assign</button>
                                </div>
                        </li>
                )
        })
        console.log(scrollY)
        return (
                <motion.div className="orders-area" 
                        ref = {ref}
                        initial={{x: '-50vw'}}
                        animate={{x: 0}} 
                        transition = {{type:"tween"}}
                        exit={{x: '-50vw', transition: {ease: "easeInOut"}}}>
                        <ul className="orders-list">
                                {order_items}
                        </ul>
                </motion.div>
        )
}

export default Orders;