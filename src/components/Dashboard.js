import React, { useState, Suspense } from 'react'
import Orders from './Orders';
import Statistics from './Statistics';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Loader from './Loader';
import '../styles/dashboard.css';

const OrderItem = React.lazy(() => import('./OrderItem')); 
const Assign = React.lazy(() => import('./Assign')); 

const Dashboard = ({ user }) => {
        useFirestoreConnect('orders')
        const orders = useSelector((state) => state.firestore.ordered.orders)
        const [toggleModal, setToggleModal] = useState({assign: false, orders: false})
        
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
                return <Loader/>

        if (isEmpty(orders)) {
                return <div style={{
                        width: '100%',
                        textAlign: "center",
                        color: "lightcoral",
                        textDecoration: "underline"
                }}>Orders List Is Empty</div>
        }
        return (
                <div className="dashboard">
                        <span className="welcome-mess">
                                Welcome, <span>{user.displayName || user.email.substr(0, user.email.indexOf('@'))}</span>
                        </span>
                        <Orders items={orders} setToggleModal={setToggleModal} />
                        <Statistics stats={stats} />
                        <Suspense fallback={<div>Loading...</div>}>
                                <OrderItem toggleModal = {toggleModal} setToggleModal={setToggleModal} />
                                <Assign toggleModal={toggleModal} setToggleModal={setToggleModal}/>
                        </Suspense>
                </div>
        )
}

export default React.memo(Dashboard);