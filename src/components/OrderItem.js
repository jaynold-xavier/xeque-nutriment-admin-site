import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/orderitem.css';

const OrderItem = ({ toggleOrderItem, setToggleOrderItem, setToggleAssign }) => {
        let { id, orderedBy, orderDate } = toggleOrderItem;
        orderDate = new Date(orderDate?.seconds * 1000).toDateString()

        return (
                <AnimatePresence exitBeforeEnter>
                        {toggleOrderItem &&
                                <motion.div className="order-item-back"
                                        initial={{ opacity: 0 }}
                                        animate={{opacity: 1}}
                                        exit={{ opacity: 0, transition: { type: "just", when: "afterChildren" } }}>
                                        <motion.div className="order-container"
                                                initial={{ x: "-100vw" }}
                                                animate={{ x: 0 }}
                                                exit={{ x: '100vw', transition: { type: "just" } }}>
                                                <span className="close-order-item" onClick={() => setToggleOrderItem(false)}>x</span>
                                                <div className="order-item-summary">
                                                        <div className="col">
                                                                ID: <span>{id}</span><br />
                                                OrderedBy: <span>{orderedBy}</span>
                                                        </div>
                                                        <div className="col">
                                                                OrderDate: <span>{orderDate}</span>
                                                                <br />Priority: <span>High</span>
                                                        </div>
                                                </div>
                                                <div className="order-item-itemlist">
                                                        <table className="table" width="100%">
                                                                <thead>
                                                                        <tr>
                                                                                <th>ID</th>
                                                                                <th>Name</th>
                                                                                <th>Date</th>
                                                                                <th>Quantity</th>
                                                                        </tr>
                                                                </thead>
                                                                <tbody>
                                                                        <tr>
                                                                                <td>123</td>
                                                                                <td>Bread</td>
                                                                                <td>{new Date().toDateString()}</td>
                                                                                <td>34</td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>102</td>
                                                                                <td>Cake</td>
                                                                                <td>{new Date().toDateString()}</td>
                                                                                <td>45</td>
                                                                        </tr>
                                                                </tbody>
                                                        </table>
                                                </div>
                                                <button className="assign-button"
                                                        onClick={() => {
                                                                setToggleOrderItem(false)
                                                                setToggleAssign(toggleOrderItem)
                                                        }}>
                                                        ASSIGN
                                </button>
                                        </motion.div>
                                </motion.div>
                        }
                </AnimatePresence>
        )
}

export default OrderItem;