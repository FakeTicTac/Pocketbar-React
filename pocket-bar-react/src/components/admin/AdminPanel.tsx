import { useContext, useEffect, useState } from 'react';

import AdminNavBar from './AdminNavBar';
import { useNavigate } from 'react-router-dom';
import { IdentityAppContext } from '../../context/AppContext';

import styles from "./AdminPanel.module.css";


/**
 * Home Page View Component.
 * @returns {JSX.Element} View Of The Home Page.
 */
const Adminpanel = (): JSX.Element => {

    /**
     * Defines Rounting Connection.
     */
    let navigate = useNavigate();

    /**
    * Defines Clock Data.
    */
    const [clock, setClock] = useState("");

    /**
      * Defines Identity State Connection
    */
    let identityState = useContext(IdentityAppContext);

    /**
     * Lifecycle Mounted. Apply Dummy Security.
     */
    useEffect(() => {

        if (identityState.jwt?.tokenValue == null) navigate("/");

        if (identityState.jwt?.role !== "Admin") navigate("/home");

        clockUpdate();

    }, []);

    /**
    * Create Timer For Intro Section.
    */
    function clockUpdate() {

        const today = new Date();

        let hours = today.getHours().toString();
        let minutes = checkTime(today.getMinutes());
        let seconds = checkTime(today.getSeconds());

        setClock(`${hours}:${minutes}:${seconds}`);

        setTimeout(clockUpdate, 1000);

    }

    /**
    * Methods Handles One Number Values. Adds 0 At The Beginning.
    * @param {number} time Defines Number To Check Its' Length.
    * @returns {string} Number With Zero At Beginning.
    */
    function checkTime(time: number): string {

        return time < 10 ? "0" + time.toString() : time.toString();

    }


    return (

        <div className="d-flex">

            <AdminNavBar />

            <section className={`d-flex d-flex justify-content-center align-items-center text-white ${styles.introSection}`}>
                <div>

                    <h1 className={`${styles.textSection} display-4`}>Hello, {identityState.jwt?.username}, It's A Great Day For Work!</h1>
                    <div className="d-flex d-flex justify-content-center align-items-center">
                        <div className={`${styles.digitalClock} d-flex justify-content-center align-items-center`}>{clock}</div>
                    </div>
                </div>
            </section>

        </div>

    );
}


export default Adminpanel;