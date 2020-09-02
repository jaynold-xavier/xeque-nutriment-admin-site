import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Google from '../icons/google.svg'
import Email from '../icons/email.svg'
import Password from '../icons/key.svg'
import { useForm } from "react-hook-form";
import { useFirebase } from 'react-redux-firebase';
import ComponentMotionTag from './ComponentMotionTag'
import '../styles/form.css';

const Form = ({ title }) => {
        const { handleSubmit, register, errors } = useForm({mode: 'onChange'});
        const firebase = useFirebase();
        const [strength, setStrength] = useState(0);
        const link_title = title === "Login" ? "signup" : "login";

        const checkPasswordStrength = (value) => {
                const input = document.querySelector("#password");
                const validations = [
                        (value.length >= 6),
                        (value.search(/^(?=.*[a-z])(?=.*\d).*$/g) > -1),
                        (value.search(/^(?=.*[A-Z]).*$/g) > -1),
                        (value.search(/[!@./'"?#$%^&*\s]/g) > -1)
                ]
                setStrength(validations.reduce((acc, curr) => acc + curr));

                if (value.length < 6) {
                        input.style.borderBottom = "3px crimson solid"
                        return "Enter minimum 6 characters"
                } else {
                        input.style.borderBottom = "3px green solid"
                        return true;
                }
        }

        const checkEmail = (value) => {
                const input = document.querySelector("#email");
                if (value.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)) {
                        input.style.borderBottom = "3px crimson solid"
                        return 'Enter a valid email address';
                } else {
                        input.style.borderBottom = "3px green solid"
                        return true;
                }
        }

        const onSubmit = (credentials) => {
                const loader = document.querySelector(".verify");
                const anim_icons = document.querySelectorAll(".verify .anim span");
                const anim_message = document.querySelector(".verify .mess");
                loader.style.marginTop = "6rem";
                loader.style.boxShadow = "inset 0px 5rem rgb(110, 81, 98)";
                anim_message.innerHTML = 'Authenticating...';
                anim_icons.forEach(e => e.style.animationPlayState = "running");

                (async function () {
                        if (title === "Login") {
                                return await firebase.login({ ...credentials})
                        } else{
                                const actionCodeSettings = {
                                        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
                                        handleCodeInApp: true
                                }
                                try{
                                        const user = await firebase.createUser({...credentials});
                                        await firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
                                        window.localStorage.setItem('emailForSignIn', user.email)
                                }catch(err){
                                        return Promise.reject(err)
                                }
                        }
                })()
                .then(()=>{
                        if(title === "Signup"){
                                loader.style.boxShadow = "inset 0px 5rem goldenrod";
                                anim_message.innerHTML = 'A confirmation link has been sent to the specified email';
                        }else{
                                loader.style.boxShadow = "inset 0px 5rem green";
                                anim_message.innerHTML = 'Success';
                        }
                })
                .catch(err => {
                        loader.style.boxShadow = "inset 0px 5rem crimson";
                        anim_message.innerHTML = err.toString().substr(0, err.toString().indexOf('.'));
                })
                .finally(_ => {
                        anim_icons.forEach(e => e.style.animationPlayState = "paused")
                        setTimeout(() => {
                                loader.style.marginTop = "0rem"
                                loader.style.boxShadow = "inset 0px 5rem rgb(110, 81, 98)";
                        }, 1000)
                })
        }

        return (
                <ComponentMotionTag className="container" data-header={title}>
                        <form id="login-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                        <label htmlFor="email"><img src={Email} alt="email-icon" /></label>
                                        <input type="text" className="form-control" name="email"
                                                aria-invalid={errors.email ? "true" : "false"}
                                                id="email" aria-describedby="helpId" placeholder="Email"
                                                ref={register({ required: "This is a required field", validate: checkEmail })} />
                                        <small id="helpId">{errors.email?.message}</small>
                                </div>
                                <div className="form-group">
                                        <label htmlFor="password"><img src={Password} alt="password-icon" /></label>
                                        <input type="password" className="form-control" name="password" 
                                                ref={register({ required: "This is a required field", validate: checkPasswordStrength })}
                                                aria-invalid={errors.password ? "true" : "false"}
                                                id="password" aria-describedby="helpId" placeholder="Password"/>
                                        <div className="bar-area">
                                                <span className={(strength > 0 && !errors.password ? 'bar bar-show' : 'bar')} />
                                                <span className={(strength > 1 && !errors.password ? 'bar bar-show' : 'bar')} />
                                                <span className={(strength > 2 && !errors.password ? 'bar bar-show' : 'bar')} />
                                                <span className={(strength > 3 && !errors.password ? 'bar bar-show' : 'bar')} />
                                        </div>
                                        <small id="helpId">{errors.password?.message}</small>
                                </div>
                                <button id="btsub" className="btn" type="submit">
                                        {title}
                                </button>
                        </form>
                        <span className="or">OR</span>
                        <br /><br />
                        <button className="googleBtn" onClick={()=>firebase.login({ provider: 'google', type: 'redirect' })}>
                                <img src={Google} alt="Google" />
                                <span>{title} with Google</span>
                        </button><br />
                        <Link to={"/" + link_title}>
                                {link_title==="login" ? "Already have an account? Click here to Login": "Don't have an account? Click here to Signup" }
                        </Link>
                </ComponentMotionTag>
        )
}

export default Form;