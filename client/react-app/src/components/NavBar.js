import {Link} from "react-router-dom";
import styles from "../styles/nav.module.css"
import NavButtons from "./NavButtons";
import Logo from "./Logo";
import {useAuth} from "../context/AuthContext";

const NavBar = () => {

    const {isLoggedIn} = useAuth();

    return (
        <nav>
            <Logo/>
            <div className={styles.navMenu}>
                <ul>
                    <li>
                        <Link to="/" className={styles.navLink}>Home</Link>
                    </li>
                    <li>
                        <Link to="/account" className={styles.navLink}>Account</Link>
                    </li>
                    {
                        isLoggedIn &&
                        (
                            <>
                                <li>
                                    <Link to="/meetings" className={styles.navLink}>Meetings</Link>
                                </li>
                                <li>
                                    <Link to="/users" className={styles.navLink}>Users</Link>
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