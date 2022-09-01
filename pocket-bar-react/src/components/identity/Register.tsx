import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { IdentityAppContext } from '../../context/AppContext';
import { IdentityService } from '../../services/Identity/IdentityService';

import styles from './Register.module.css';



/**
 * Register Page View Component.
 * @returns {JSX.Element} View Of The Register Page.
 */
const Register = (): JSX.Element => {

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
      * Defines Password Repeater.
      */
     const [repeatPassword, setRepeatPassword] = useState('');

     /**
      * Defines Register Data.
      */
     const [registerData, setRegisterData] = useState({ email: '', userName: '', password: '' });
 
     /**
      * Method Registers User Into System After Clicking Button.
      * @param {Event} e Defines Event That Dragged Here.
      */
     const registerClicked = async (e: Event) => {
 
         e.preventDefault();
 
         let identityService = new IdentityService();
 
         // Check Passwords.
         if (repeatPassword !== registerData.password) {
            setErrorFlag(true);
            return;
         }

         let response = await identityService.register(registerData);
         
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
             return <div className="alert alert-danger text-center mb-5">You Typed Wrong Credentials. Please Try Again!</div> 
         else 
             return <div></div>
     }

    return (

        <section className={`${styles.wrapper} vh-100`}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className={`card bg-dark text-white  ${styles.dataBox}`}>
                            <div className="card-body p-5 text-center">
                                 <div className="mb-md-5 mt-md-4 pb-5">
    
                                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    
                                    <p className="text-white mt-5 mb-5">Please Enter Your Credentials Below!</p>
                    
                                    <ErrorTyped />

                                    <div className="form-outline form-white mb-4">
                                        <input value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} type="email" id="typeEmailX" className="form-control form-control-lg" placeholder="Email" />
                                    </div>
                    
                                    <div className="form-outline form-white mb-4">
                                        <input value={registerData.userName} onChange={e => setRegisterData({ ...registerData, userName: e.target.value })} type="username" id="typeUsernameX" className="form-control form-control-lg" placeholder="Username" />
                                    </div>
                    
                                    <div className="form-outline form-white mb-4">
                                        <input value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} type="password" id="typePasswordX" className="form-control form-control-lg" placeholder="Password" />
                                    </div>
                                
                                    <div className="form-outline form-white mb-4">
                                        <input onChange={e => setRepeatPassword(e.target.value)} type="password" id="typePasswordRepeatX" className="form-control form-control-lg" placeholder="Repeat Password" />
                                    </div>
                    
                                    <button onClick={(e) => registerClicked(e.nativeEvent)} className="btn btn-outline-light btn-lg px-5 mt-5">Register</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}



export default Register;
