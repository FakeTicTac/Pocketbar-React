import React from 'react';

import { Link } from 'react-router-dom';

import styles from './Landing.module.css';


/**
 * Landing Page View Component.
 * @returns {JSX.Element} View Of The Landing Page.
 */
const Landing = (): JSX.Element => {

    return (

        <>
            <div className={`${styles.intro} bg-image vh-100 shadow-1-strong`}>
                <video className={`${styles.video}`} playsInline autoPlay={true} muted loop>
                <source className="h-100" src="/videos/landing-bar.mp4" type="video/mp4" />
                </video>
            </div>

            <div className={`${styles.wrapper}`}>
                <h1 className={`${styles.h1} mb-3 text-center`}>Pocket Bar</h1>
                <div className="container d-flex align-items-center justify-content-center text-center h-100">
                    <div className="text-white">
                        <h5 className={`${styles.h5} mb-4`}>Choose From 130,000 Cockatails With New Additions</h5>
                        <h5 className={`${styles.h5} ${styles.textBottom} mb-4`}>Published Every Month</h5>

                        <Link to="/login" className={`btn btn-outline-light ${styles.btnAction} btn-lg m-2`}>Sign In</Link>
                        <Link to="/register" className={`btn btn-outline-light ${styles.btnAction} btn-lg m-2`}>Register</Link>

                    </div>
                </div>
            </div>
        </>

    )

}



export default Landing;
