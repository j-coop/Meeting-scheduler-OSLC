import {Link} from "react-router-dom";
import logo from "../resources/logo.png"
import styles from "../styles/nav.module.css"
import NavButtons from "./NavButtons";

const appName = "MeetIT";

const NavBar = () => {
    return (
        <nav>
            <img alt={"logo"} src={logo} className={styles.appLogo}/>
            <div className={styles.appName}>{appName}</div>
            <div className={styles.navMenu}>
                <ul>
                    <li>
                        <Link to="/" className={styles.navLink}>Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs" className={styles.navLink}>Blogs</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={styles.navLink}>Contact</Link>
                    </li>
                </ul>
            </div>
            <NavButtons/>
        </nav>
    )
}

export default NavBar;