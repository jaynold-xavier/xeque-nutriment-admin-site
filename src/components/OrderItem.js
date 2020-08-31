import React from 'react'
import ComponentMotionTag from './ComponentMotionTag'
import '../styles/orderitem.css';

const OrderItem = ({ toggleOrderItem, setToggleOrderItem, setToggleAssign }) => {
        let { id, orderedBy, orderDate } = toggleOrderItem;
        orderDate = new Date(orderDate?.seconds * 1000).toDateString()

        return (<>
                {toggleOrderItem &&
                        <section className="order-item-back">
                                <ComponentMotionTag className="order-container">
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
                                </ComponentMotionTag>
                        </section>
                }</>
        )
}

export default OrderItem;