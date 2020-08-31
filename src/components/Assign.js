import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useFirestoreConnect, isLoaded, isEmpty, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import '../styles/assign.css';

const Assign = ({ toggleAssign, setToggleAssign, setToggleOrderItem }) => {
        useFirestoreConnect('employees')
        const db = useFirestore();
        const emps = useSelector((state) => state.firestore.ordered.employees)
        const [selectedEmployee, setSelectedEmployee] = useState(undefined);

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

                setSelectedEmployee(target.getAttribute('data-key'))
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

        const assignEmployee = () => {
                const loader = document.querySelector(".verify");
                const anim_icons = document.querySelectorAll(".verify .anim span");
                const anim_message = document.querySelector(".verify .mess");
                loader.style.marginTop = "1rem";
                loader.style.opacity = 1;
                loader.style.boxShadow = "inset 0px 5rem grey";
                anim_message.innerHTML = 'Processing';
                anim_icons.forEach(e => e.style.animationPlayState = "running")

                if(selectedEmployee){
                        db.collection("assignments").doc().set({
                                order_id: toggleAssign.id,
                                emp_email: selectedEmployee
                        })
                        .then(function () {
                                loader.style.boxShadow = "inset 0px 5rem green";
                                anim_message.innerHTML = "Assignment Successfull";
                                setToggleAssign(false);
                        })
                        .catch((err)=> {
                                loader.style.boxShadow = "inset 0px 5rem crimson";
                                anim_message.innerHTML = err.toString().substr(0, err.toString().indexOf('.'));
                        })
                }else{
                        loader.style.boxShadow = "inset 0px 5rem crimson";
                        anim_message.innerHTML = "Please select an employee";
                }
                anim_icons.forEach(e => e.style.animationPlayState = "paused")
                setTimeout(()=>{
                        loader.style.marginTop = "-3.5rem"
                        loader.style.boxShadow = "inset 0px 5rem grey";
                }, 1500)
        }
        return (
                <AnimatePresence exitBeforeEnter>
                        {toggleAssign &&
                                <motion.div className="order-item-back"
                                        initial={{ opacity: 0 }}
                                        animate={{opacity: 1}}
                                        exit={{ opacity: 0, transition: { type: "just", when: "afterChildren" } }}>
                                        <motion.div className="assign-container"
                                                data-id={'Assignment to ID ' + toggleAssign.id}
                                                initial={{ x: "-100vw" }}
                                                animate={{ x: 0 }}
                                                exit={{ x: '100vw', transition: { type: "just", duration: 0.5 } }}>
                                                <span className="close-order-item" onClick={() => setToggleAssign(false)}>x</span>
                                                <span className="go-back" onClick={() => {
                                                        setToggleOrderItem(toggleAssign)
                                                        setToggleAssign(false)
                                                }}>{'<'}</span>

                                                <div className="grid-employees">
                                                        {emp_list}
                                                </div>

                                                <button className="assign-button" onClick={() => assignEmployee()}>
                                                        SELECT
                                                </button>
                                        </motion.div>
                                </motion.div>
                        }
                </AnimatePresence>
        )
}
export default Assign;