
import { Link, useLocation } from 'react-router-dom';

import styles from "./AdminNavBar.module.css";

/**
 * Admin Navigation Bar View Component.
 * @returns {JSX.Element} View Of The Admin Navigation Bar.
 */
const AdminNavBar = (): JSX.Element => {

    /**
     * Defines Router Location.
     */
    const location = useLocation();

    return (
        <>
            <div className={`d-flex ${styles.sideBar}  flex-column flex-shrink-0 p-3 text-white bg-dark`}>
                <span className={`fs-3 text-center ${styles.sectionTitle}`}>Control Panel</span>
                <hr />

                <ul className="nav nav-pills mt-5 flex-column mb-auto">
                    <li className="nav-item">

                        <Link to="/admin" className={`nav-link ${styles.navLink} ${location.pathname === "/admin" ? styles.active : ""} mt-1 text-white`}>Control Panel Home</Link>
                        <Link to="/home" className={`nav-link ${styles.navLink} ${location.pathname === "/home" ? styles.active : ""} mt-1 text-white`}>Website Home</Link>

                    </li>

                    <hr className="mt-5" />
                    <span className={`fs-5 text-center ${styles.sectionTitle}`}>Data Management</span>
                    <hr />

                    <li className="mt-2">

                        <Link to="/drink-types" className={`nav-link ${styles.navLink} ${location.pathname === "/drink-types" ? styles.active : ""} mt-1 text-white`}>Drink Types</Link>

                    </li>
                    <li>

                        <Link to="/ingredients" className={`nav-link ${styles.navLink} ${location.pathname === "/ingredients" ? styles.active : ""} mt-1 text-white`}>Ingredients</Link>

                    </li>

                </ul>
                <hr />

                <a className={`nav-link ${styles.logout} text-center fs-4 text-white`} href="">Logout</a>

            </div>
        </>

    );
}


export default AdminNavBar;