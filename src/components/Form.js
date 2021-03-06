import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Google from '../icons/google.svg'
import Email from '../icons/email.svg'
import Password from '../icons/key.svg'
import { useForm } from "react-hook-form";
import { useFirebase } from 'react-redux-firebase';
import ComponentMotionTag from './ComponentMotionTag'
import '../styles/form.css';

const Form = ({ isLogin }) => {
        const { handleSubmit, register, errors } = useForm({ mode: 'onChange' });
        const firebase = useFirebase();
        const [strength, setStrength] = useState(0);
        const link_title = isLogin ? "login" : "signup";

        const weakPassword = /^(?=.*[a-z])(?=.*\d).*$/g;
        const goodPassword = /^(?=^.{10,}$)(?=.*[A-Z]).*$/g;
        const strongPassword = /[!@./'"?#$%^&*\s]/g;

        const checkPasswordStrength = (value) => {
                const validations = [
                        (value.length >= 6),
                        (value.search(weakPassword) > -1),
                        (value.search(goodPassword) > -1),
                        (value.search(strongPassword) > -1)
                ]
                setStrength(validations.reduce((acc, curr) => acc + curr));
                return value.length < 6 ?
                        "Enter minimum 6 characters" : true;
        }

        const checkEmail = (value) => {
                return value.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) ?
                        'Enter a valid email address' :
                        true
        }

        const onSubmit = async (credentials) => {
                const loader = document.querySelector(".verify").style;
                const btn = document.querySelector(".btn");
                const anim = document.querySelector(".verify .anim");
                const anim_message = document.querySelector(".verify .mess");

                loader.boxShadow = "inset 0px 5rem #234b6e";
                anim.style.animationDuration = "500ms";
                loader.marginTop = "6rem";
                anim_message.innerHTML = 'Authenticating...';
                btn.disabled = true;

                try {
                        if (isLogin) {
                                const loginData = await firebase.login({ ...credentials });
                                if (!loginData.user.user.emailVerified)
                                        throw new Error("Your account is not verified!!.")
                                loader.boxShadow = "inset 0px 5rem green";
                                anim_message.innerHTML = 'Successfully logged in';
                        } else {
                                const actionCodeSettings = {
                                        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
                                        handleCodeInApp: true
                                }
                                const user = await firebase.createUser({ ...credentials });
                                await firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
                                window.localStorage.setItem('emailForSignIn', user.email)
                                loader.boxShadow = "inset 0px 5rem goldenrod";
                                anim_message.innerHTML = 'A confirmation link has been sent to your email';
                        }
                } catch (err) {
                        loader.boxShadow = "inset 0px 5rem crimson";
                        anim_message.innerHTML = err.toString().substr(0, err.toString().indexOf('.'));
                } finally {
                        anim.style.animationDuration = "0ms";
                        await setTimeout(() => {
                                loader.marginTop = "0rem";
                                loader.ontransitionend = btn.disabled = false;
                        }, 2000);
                }
        }

        return (
                <ComponentMotionTag className="container" data-header={link_title}>
                        <form id="login-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                        <label htmlFor="email"><img src={Email} alt="email-icon" /></label>
                                        <input type="text" className="form-control" name="email"
                                                aria-invalid={!!errors.email}
                                                id="email" aria-describedby="helpId" placeholder="Email"
                                                ref={register({ required: "This is a required field", validate: checkEmail })} />
                                        <small id="helpId">{errors.email?.message}</small>
                                </div>
                                <div className="form-group">
                                        <label htmlFor="password"><img src={Password} alt="password-icon" /></label>
                                        <input type="password" className="form-control" name="password"
                                                ref={register({ required: "This is a required field", validate: checkPasswordStrength })}
                                                aria-invalid={!!errors.password}
                                                id="password" aria-describedby="helpId" placeholder="Password" />
                                        <div className="bar-area">
                                                <span className={"bar" + (strength > 0 && !errors.password ? ' bar-show' : '')} />
                                                <span className={"bar" + (strength > 1 && !errors.password ? ' bar-show' : '')} />
                                                <span className={"bar" + (strength > 2 && !errors.password ? ' bar-show' : '')} />
                                                <span className={"bar" + (strength > 3 && !errors.password ? ' bar-show' : '')} />
                                        </div>
                                        <small id="helpId">{errors.password?.message}</small>
                                </div>
                                <button className="btn">{link_title}</button>
                        </form>
                        <span className="or">OR</span>
                        <br /><br />
                        <button className="googleBtn" onClick={async () => await firebase.login({ provider: 'google', type: 'redirect' })}>
                                <img src={Google} alt="Google" />
                                <span>{link_title} with Google</span>
                        </button><br />
                        <Link to={"/" + (isLogin ? "signup" : "login")}>
                                {!isLogin ? "Already have an account? Click here to Login" : "Don't have an account? Click here to Signup"}
                        </Link>
                </ComponentMotionTag>
        )
}

export default React.memo(Form);