import React, { useState } from 'react'
import { useFirestoreConnect, isLoaded, isEmpty, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import ComponentMotionTag from './ComponentMotionTag'
import '../styles/assign.css';
import User from '../icons/user.svg'

const Assign = ({ toggleModal, setToggleModal }) => {
        useFirestoreConnect({
                collection: 'employees',
                orderBy: ['ordersCompleted', 'desc'],
        })
        const db = useFirestore();
        const emps = useSelector((state) => state.firestore.ordered.employees)
        const [selectedEmployee, setSelectedEmployee] = useState(null);

        if (!isLoaded(emps))
                return false

        if (isEmpty(emps)) {
                return <div style={{
                        width: '100%',
                        textAlign: "center",
                        color: "dodgerblue",
                }}>Employees List Is Empty</div>
        }

        const changeSelection = (e) => {
                const target = e.currentTarget;
                const employees = e.currentTarget.parentElement.childNodes;
                Array.from(employees).filter(ele => ele.classList.contains("selected"))
                        .map(element => element.classList.remove("selected"));

                setSelectedEmployee(target.getAttribute('data-key'));
                target.classList.add('selected');
        }

        const emp_list = Object.keys(emps).map((key) => {
                const { id, name, email, ordersCompleted } = emps[key];
                return (
                        <div className={"grid-employees-item" + (email === selectedEmployee ? " selected" : "")}
                                data-key={email} key={id} onClick={(e) => changeSelection(e)}>
                                <img src={User} alt="user-template" />
                                <div className="item-content" style={{ width: "60%" }}>
                                        <div><span>{name}</span></div>
                                        <div>Orders Completed: <span>{ordersCompleted}</span></div>
                                </div>
                        </div>
                )
        })

        const assignEmployee = () => {
                const loader = document.querySelector(".verify").style;
                const anim = document.querySelector(".verify .anim").style;
                const anim_message = document.querySelector(".verify .mess");
                const btn = document.querySelector(".assign-button");

                loader.boxShadow = "inset 0px 5rem #234b6e";
                loader.marginTop = "6rem";

                anim.animationDuration = "500ms";
                anim_message.innerHTML = window.navigator.onLine
                        ? 'Processing...' : 'Assignment will be made when back online';
                btn.disabled = true;
                db.collection("assignments").doc().set({
                        order_id: toggleModal.assign.id,
                        emp_email: selectedEmployee
                }).then(_ => {
                        loader.boxShadow = "inset 0px 5rem green";
                        anim_message.innerHTML = "Assignment Successfull";
                        setSelectedEmployee(null);
                        setToggleModal({ orders: false, assign: false });
                }).catch((err) => {
                        loader.boxShadow = "inset 0px 5rem crimson";
                        anim_message.innerHTML = err.toString().substr(0, err.toString().indexOf('.'));
                }).finally(_ => {
                        anim.animationDuration = "0ms";
                        setTimeout(() => {
                                loader.marginTop = "0rem";
                                loader.ontransitionend = btn.disabled = false;
                        }, 2000);
                })
        }
        return toggleModal.assign ?
                (
                        <ComponentMotionTag className="order-container"
                                data-id={'Order #' + toggleModal.assign.id}>
                                <span className="close-order-item" onClick={() => setToggleModal({ orders: false, assign: false })}>x</span>
                                <span className="go-back" onClick={() => {
                                        setToggleModal({ orders: toggleModal.assign, assign: false })
                                }}>{'<'}</span>

                                <div className="grid-employees">
                                        {emp_list}
                                </div>

                                <button className="assign-button"
                                        disabled={selectedEmployee ? false : true}
                                        onClick={assignEmployee}>
                                        Assign
                                        </button>
                        </ComponentMotionTag>
                ) : false
}
export default React.memo(Assign);