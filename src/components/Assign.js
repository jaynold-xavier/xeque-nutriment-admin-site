import React, { useState } from 'react'
import { useFirestoreConnect, isLoaded, isEmpty, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import ComponentMotionTag from './ComponentMotionTag'
import '../styles/assign.css';

const Assign = ({ toggleModal, setToggleModal }) => {
        useFirestoreConnect('employees')
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
                const { id, name, email } = emps[key];
                return (
                        <div className="grid-employees-item" data-key={email} key={id} onClick={(e) => changeSelection(e)}>
                                <span>{name.substr(0, 1).toUpperCase()}</span>
                                <span>{name}</span>
                        </div>
                )
        })

        const assignEmployee = async () => {
                const loader = document.querySelector(".verify").style;
                const anim = document.querySelector(".verify .anim").style;
                const anim_message = document.querySelector(".verify .mess");
                loader.boxShadow = "inset 0px 5rem rgb(110, 81, 98)";
                loader.marginTop = "6rem";

                try {
                        if (selectedEmployee) {
                                anim_message.innerHTML = window.navigator.onLine
                                        ? 'Processing...' : 'Assignment will be made when back online';
                                anim.animationPlayState = "running";

                                await db.collection("assignments").doc().set({
                                        order_id: toggleModal.assign.id,
                                        emp_email: selectedEmployee
                                })
                                loader.boxShadow = "inset 0px 5rem green";
                                anim_message.innerHTML = "Assignment Successfull";
                                setToggleModal({ orders: false, assign: false });
                        } else {
                                loader.boxShadow = "inset 0px 5rem crimson";
                                anim_message.innerHTML = "Please select an employee";
                        }
                        setSelectedEmployee(null)
                } catch (err) {
                        loader.boxShadow = "inset 0px 5rem crimson";
                        anim_message.innerHTML = err.toString().substr(0, err.toString().indexOf('.'));
                } finally {
                        anim.animationPlayState = "paused";
                        await setTimeout(() => loader.marginTop = "0rem", 2000);
                }
        }

        return (<>
                {toggleModal.assign &&
                        <section className="order-item-back">
                                <ComponentMotionTag className="assign-container"
                                        data-id={'Assignment to ID ' + toggleModal.assign.id}>
                                        <span className="close-order-item" onClick={() => setToggleModal({ orders: false, assign: false })}>x</span>
                                        <span className="go-back" onClick={() => {
                                                setToggleModal({ orders: toggleModal.assign, assign: false })
                                        }}>{'<'}</span>

                                        <div className="grid-employees">
                                                {emp_list}
                                        </div>

                                        <button className="assign-button" onClick={assignEmployee}>
                                                SELECT
                                        </button>
                                </ComponentMotionTag>
                        </section>
                }</>
        )
}
export default React.memo(Assign);