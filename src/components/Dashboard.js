import React, { useState } from 'react'
import Orders from './Orders';
import Statistics from './Statistics';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Loader from './Loader';
import '../styles/dashboard.css';
import { motion } from 'framer-motion';

const OrderItem = React.lazy(() => import('./OrderItem'));
const Assign = React.lazy(() => import('./Assign'));

const Dashboard = ({ user }) => {
        useFirestoreConnect({
                collection: 'orders',
                orderBy: 'orderDate',
        })
        const orders = useSelector((state) => state.firestore.ordered.orders)
        const [toggleModal, setToggleModal] = useState({ assign: false, orders: false })

        const stats = [
                {
                        title: "Orders Recieved",
                        num: 10
                },
                {
                        title: "Orders Delivered",
                        num: 5
                },
                {
                        title: "Orders In-Progress",
                        num: 3
                },
        ]

        if (!isLoaded(orders))
                return <Loader />

        if (isEmpty(orders)) {
                return <div style={{
                        width: '100%',
                        textAlign: "center",
                        color: "lightcoral",
                        textDecoration: "underline"
                }}>Orders List Is Empty</div>
        }
        return (
                <motion.div className="dashboard" initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { type: "just", when: "beforeChildren" } }}>

                        <span className="welcome-mess">
                                Welcome, <span>{user.displayName || user.email.substr(0, user.email.indexOf('@'))}</span>
                        </span>
                        <Orders items={orders} setToggleModal={setToggleModal} />
                        <Statistics stats={stats} />
                        <section className="order-item-back"
                                style={{ display: toggleModal.assign || toggleModal.orders ? 'block' : 'none' }}>
                                <OrderItem toggleModal={toggleModal} setToggleModal={setToggleModal} />
                                <Assign toggleModal={toggleModal} setToggleModal={setToggleModal} />
                        </section>
                </motion.div>
        )
}

export default React.memo(Dashboard);