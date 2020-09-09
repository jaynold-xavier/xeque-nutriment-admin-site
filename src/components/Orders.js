import React from 'react'
import ComponentMotionTag from './ComponentMotionTag'

const Orders = ({ items, setToggleModal }) => {
        const order_items = Object.values(items).map(item => {
                const { id, orderedBy, orderDate } = item;
                const sec = new Date(orderDate.seconds * 1000).toDateString()
                return (
                        <li className="order-item" key={id}>
                                <div className="item-content">
                                        <div>Order<span> # {id}</span></div>
                                        <div>by, <span>{orderedBy}</span></div>
                                        <div>on, <span>{sec}</span></div>
                                </div>
                                <div className="actions">
                                        <button onClick={() => setToggleModal({ assign: false, orders: item })}>View Details</button>
                                        <button onClick={() => setToggleModal({ assign: item, orders: false })}>Assign</button>
                                </div>
                        </li>
                )
        })
        return (
                <ComponentMotionTag className="orders-area" data-title="Orders">
                        <ul className="orders-list">
                                {order_items}
                        </ul>
                </ComponentMotionTag>
        )
}

export default React.memo(Orders);