import React, { useContext, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IdentityAppContext } from '../../context/AppContext';

import styles from './Home.module.css';


/**
 * Home Page View Component.
 * @returns {JSX.Element} View Of The Home Page.
 */
const Home = (): JSX.Element => {

    /**
     * Defines Rounting Connection.
     */
    let navigate = useNavigate();

    /**
     * Defines Identity State Connection
     */
    let identityState = useContext(IdentityAppContext);

    /**
     * Lifecycle Mounted. Apply Dummy Security.
     */
    useEffect(() =>  {

        if (identityState.jwt?.tokenValue == null ) navigate("/")

    });

    /**
     * Method Logs User Out Of The System.
     */
    function logOutClicked() {

        identityState.setJwt(null);
        navigate("/");

    }

    /**
     * Method Handles Admin Panel.
     * @returns Admin Panel. Section Div.
     */
    function AdminPanel() {

        if (identityState.jwt?.role == "Admin") 
            return (

                <div className={`${styles.backgroundFour} ${styles.linkContainer}`}>
                    <Link to="/admin" className={`${styles.a} ${styles.linkFour}`}>Admin Panel</Link>
                </div>

            );
        else 
            return null;
    }
     
     
    return (

        <div className={`${identityState.jwt?.role === "Admin" ? `${styles.homeContainerFour}` : `${styles.homeContainerThree}`}`}>

            <div className={`${styles.backgroundOne} ${styles.linkContainer}`}>
                <Link to="/cocktails" className={`${styles.a} ${styles.linkOne}`}>Explore Cocktails</Link>
            </div>
        
            <div className={`${styles.backgroundTwo} ${styles.linkContainer}`}>
                <Link to="/home" className={`${styles.a} ${styles.linkTwo}`}>My Favourites</Link>
            </div>
        
            <AdminPanel />
        
            <div className={`${styles.backgroundThree} ${styles.linkContainer}`}>
                <a className={`${styles.a} ${styles.linkThree}`} onClick={() => logOutClicked()} href="">Logout</a>
            </div>
    
        </div>
    
    );
}


export default Home;
