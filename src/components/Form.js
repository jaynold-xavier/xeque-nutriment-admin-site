import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom'
import Google from '../icons/google.webp'
import Email from '../icons/email.svg'
import Password from '../icons/key.svg'
import { useForm } from "react-hook-form";
import { useFirebase } from 'react-redux-firebase';
import { motion } from 'framer-motion'
import { provider } from "../config/xequeFbConfig";
import '../styles/form.css';

const Form = ({title}) => {
        const { handleSubmit, register, errors } = useForm({
                mode: 'onChange'
        });
        const history = useHistory();
        const firebase = useFirebase();
        const [strength, setStrength] = useState(0);

        const link_title = title === "Login" ? "signup" : "login"
        const message = title === "Login" ?
                "Don't have an account? Click here to Sign up" :
                "Already have an account? Click here to Login";

        const weak_password = /^(?=.*[a-z])(?=.*\d).*$/g
        const medium_password = /^(?=.*[A-Z]).*$/g
        const strong_password = /[!@./'"?#$%^&*\s]/g
        const regex_email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi;

        const checkPasswordStrength = (value) => {
                const input = document.querySelector("#password");
                const validations = [
                        (value.length >= 6),
                        (value.search(weak_password) > -1),
                        (value.search(medium_password) > -1),
                        (value.search(strong_password) > -1)
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
                if (value.search(regex_email)) {
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
                loader.style.marginTop = "1rem";
                loader.style.opacity = 1;
                loader.style.boxShadow = "inset 0px 5rem grey";
                anim_message.innerHTML = 'Authenticating';
                anim_icons.forEach(e => e.style.animationPlayState = "running");

                (async function () {
                        if (title === "Login") {
                                return await firebase.login({ email: credentials.email, password: credentials.password })
                        } else if ("Signup") {
                                return await firebase.createUser({ email: credentials.email, password: credentials.password })
                        }
                        else ;
                })()
                .then(() => history.push("/dashboard"))
                .catch(err => {
                        loader.style.boxShadow = "inset 0px 5rem crimson";
                        anim_message.innerHTML = err.toString().substr(0, err.toString().indexOf('.'));
                })
                .finally(() => {
                        anim_icons.forEach(e => e.style.animationPlayState = "paused")
                        setTimeout(()=>{
                                loader.style.marginTop = "-200px"
                                loader.style.boxShadow = "inset 0px 5rem grey";
                        }, 1500)
                })
        }

        const googleOptions = () => {
                const loader = document.querySelector(".verify");
                const anim_icons = document.querySelectorAll(".verify .anim span");
                if(loader.style.opacity === 1){
                        loader.style.marginTop = "-1rem";
                        loader.style.opacity = 0;
                        loader.style.boxShadow = "none";
                        anim_icons.forEach(e => e.style.animationPlayState = "paused")
                }

                firebase.auth().signInWithRedirect(provider)
                        .then(() => history.push("/dashboard"))
                        .catch(err => console.log(err.message))
        };

        return (
                <motion.div className="container" data-header={title}
                        initial={{ x: '-100vw'}} 
                        animate={{ x: 0 }} 
                        transition={{type: 'tween'}} 
                        exit={{ x: '100vw',
                        transition: { ease: "easeInOut", type: 'tween', mass: 0.4, damping: 7 } }}>
                        <div className="verify">
                                <div className="anim">
                                        <span>|</span>
                                        <span>|</span>
                                        <span>|</span>
                                </div>
                                <div className="mess">Authenticating</div>
                        </div>
                        <form id="login-form" method="POST" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                        <label htmlFor="email"><img src={Email} alt="email-icon" /></label>
                                        <input type="text" className="form-control" name="email"
                                                aria-invalid={errors.email ? "true" : "false"}
                                                id="email" aria-describedby="helpId" placeholder="Email"
                                                ref={register({ required: "This is a required field", validate: checkEmail })}
                                                onChange={(e) => { if (!e.target.value) e.target.style.borderBottomColor = "crimson" }} />
                                        <small id="helpId">{errors.email && (errors.email.message)}</small>
                                </div>
                                <div className="form-group">
                                        <label htmlFor="password"><img src={Password} alt="password-icon" /></label>
                                        <input type="password" className="form-control" name="password" ref={register({ required: "This is a required field", validate: checkPasswordStrength })}
                                                aria-invalid={errors.password ? "true" : "false"}
                                                id="password" aria-describedby="helpId" placeholder="Password"
                                                onChange={(e) => { if (!e.target.value) document.querySelector("#password").style.borderBottom = "3px crimson solid" }} />
                                        <div className="bar-area">
                                                <span className={(strength > 0 && !errors.password ? 'bar bar-show' : 'bar')} />
                                                <span className={(strength > 1 && !errors.password ? 'bar bar-show' : 'bar')} />
                                                <span className={(strength > 2 && !errors.password ? 'bar bar-show' : 'bar')} />
                                                <span className={(strength > 3 && !errors.password ? 'bar bar-show' : 'bar')} />
                                        </div>
                                        <small id="helpId">{(errors.password && errors.password.message)}</small>
                                </div>
                                <motion.button id="btsub" className="btn" type="submit"
                                        initial={{ scale: 0.8 }} whileHover={{scale: 1}}>
                                        {title}
                                </motion.button>
                        </form>
                        <span className="or">OR</span>
                        <br />
                        <br />
                        <motion.div id="customBtn" className="customGPlusSignIn" initial={{scale: 0.9}}
                                whileHover={{ scale: 1.2 }} onClick={googleOptions}>
                                <img src={Google} alt="Google sign in link" />
                                <span className="buttonText">{title} with Google</span>
                        </motion.div><br />
                        <Link to={"/" + link_title}>{message}</Link>
                </motion.div>
        )
}
export default Form;