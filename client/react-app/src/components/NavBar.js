import {Link} from "react-router-dom";
import styles from "../styles/nav.module.css"
import NavButtons from "./NavButtons";
import Logo from "./Logo";

const NavBar = () => {
    return (
        <nav>
            <Logo/>
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