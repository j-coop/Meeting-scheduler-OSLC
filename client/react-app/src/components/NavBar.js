import {Link} from "react-router-dom";
import styles from "../styles/nav.module.css"
import NavButtons from "./NavButtons";
import Logo from "./Logo";
import {useAuth} from "../context/AuthContext";
import {Typography} from "@mui/material";
import React from "react";

const NavBar = () => {

    const {isLoggedIn} = useAuth();

    return (
        <nav>
            <Logo/>
            <div className={styles.navMenu}>
                <ul>
                    <li>
                        <Link to="/" className={styles.navLink}>
                            <Typography variant="h6" color="textPrimary">Home</Typography>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className={styles.navLink}>
                            <Typography variant="h6" color="textPrimary">Settings</Typography>
                        </Link>
                    </li>
                    {
                        isLoggedIn &&
                        (
                            <>
                                <li>
                                    <Link to="/meetings" className={styles.navLink}>
                                        <Typography variant="h6" color="textPrimary">Meetings</Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/users" className={styles.navLink}>
                                        <Typography variant="h6" color="textPrimary">Users</Typography>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
            <NavButtons/>
        </nav>
    )
}

export default NavBar;