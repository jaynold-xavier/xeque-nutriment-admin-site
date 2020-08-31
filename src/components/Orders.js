import React from 'react'
import ComponentMotionTag from './ComponentMotionTag'

const Orders = ({ items, setToggleOrderItem, setToggleAssign }) => {
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
        return (
                <ComponentMotionTag className="orders-area">
                        <ul className="orders-list">
                                {order_items}
                        </ul>
                </ComponentMotionTag>
        )
}

export default Orders;