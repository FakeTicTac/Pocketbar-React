import React, { useContext, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IdentityAppContext } from '../../context/AppContext';
import { IdentityService } from '../../services/Identity/IdentityService';

import styles from './Login.module.css';


/**
 * Login Page View Component.
 * @returns {JSX.Element} View Of The Login Page.
 */
const Login = (): JSX.Element => {

    /**
     * Defines Rounting Connection.
     */
    let navigate = useNavigate();

    /**
     * Defines Identity State Connection
     */
    let identityState = useContext(IdentityAppContext);

    /**
     * Defines Error Occurance.
     */
    const [errorFlag, setErrorFlag] = useState(false);

    /**
     * Defines Login Data.
     */
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    /**
     * Method Logs User Into System After Clicking Button.
     * @param {Event} e Defines Event That Dragged Here.
     */
    const logInClicked = async (e: Event) => {

        e.preventDefault();

        let identityService = new IdentityService();

        let response = await identityService.login(loginData);
        
        // Check If Operation Succeded.
        if (response.statusCode === 200) {
            identityState.setJwt(response.data!);

            setErrorFlag(false);

            navigate('/home');
        }

        setErrorFlag(true);
    }

    /**
     * Method Handles Errors Occured During Call In Backend. 
     * @returns Error Section Div.
     */
    function ErrorTyped() {

        if (errorFlag) 
            return <div className="alert alert-danger text-center mb-5">Wrong Email or Password. Try Again!</div> 
        else 
            return <div></div>
    }


    return (

        <section className={`${styles.wrapper} vh-100`}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className={`card bg-dark text-white ${styles.dataBox}`}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
    

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
    
                                    <p className="text-white mt-5 mb-5">Please Enter Your Login and Password!</p>
    
                                    <ErrorTyped />

                                    <div className="form-outline form-white mb-4">
                                        <input value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })}  type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="Email" />
                                    </div>
    
                                    <div className="form-outline form-white mb-4">
                                        <input value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })}  type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="Password" />
                                    </div>
                  
                                    <button onClick={(e) => logInClicked(e.nativeEvent)} className="btn btn-outline-light btn-lg px-5 mt-5">Login</button>
                    
                                </div>
    
                                <div>
            
                                    <p className="mb-0">Don't Have an Account? 
                                        <Link to="/register" className="fw-bold p-1">Sign Up</Link>
                                    </p>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}



export default Login;
