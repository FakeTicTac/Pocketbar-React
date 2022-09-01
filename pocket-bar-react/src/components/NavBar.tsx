import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IdentityAppContext } from '../context/AppContext';

import styles from './NavBar.module.css';


/**
 * Home Page View Component.
 * @returns {JSX.Element} View Of The Home Page.
 */
const NaVBar = (): JSX.Element => {

    /**
     * Defines Rounting Connection.
     */
    let navigate = useNavigate();

    /**
     * Defines Identity State Connection
     */
    let identityState = useContext(IdentityAppContext);

    /**
     * Method Logs User Out Of The System.
     */
    function logout(e: React.MouseEvent) {

        e.preventDefault();

        // Remove Identity State And Return To Landing Page.
        identityState.setJwt(null);
        navigate('/');
    }

    return (

        <nav className=" d-flex justify-content-center navbar navbar-dark bg-dark">

            <Link to="/home" className="navbar-brand mb-0 ${styles.h1}">Home</Link>

            <span className={`${styles.span}`}> | </span>

            <Link to="/cocktails" className="navbar-brand mb-0 ${styles.h1}">Cocktails</Link>

            <a href="" onClick={ (e) => logout(e) } className={`${styles.navbarBrand} ${styles.logout} mb-0 ${styles.h1}`}>Logout</a>

        </nav>

    );
}


export default NaVBar;