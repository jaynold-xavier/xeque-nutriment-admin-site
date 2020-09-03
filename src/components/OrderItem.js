import React from 'react'
import ComponentMotionTag from './ComponentMotionTag'
import '../styles/orderitem.css';

const OrderItem = ({ toggleModal, setToggleModal }) => {
        let { id, orderedBy, orderDate } = toggleModal.orders;
        orderDate = new Date(orderDate?.seconds * 1000).toDateString()

        return (<>
                {toggleModal.orders &&
                        <section className="order-item-back">
                                <ComponentMotionTag className="order-container">
                                        <span className="close-order-item" onClick={() => setToggleModal({orders: false, assign: false})}>x</span>
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
                                                        setToggleModal({assign: toggleModal.orders, orders: false})
                                                }}>
                                                ASSIGN
                                        </button>
                                </ComponentMotionTag>
                        </section>
                }</>
        )
}

export default React.memo(OrderItem);