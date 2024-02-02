import logo from "../resources/logo.png";
import styles from "../styles/nav.module.css";
import {Link} from "react-router-dom";

const appName = "MeetIT";

const Logo = () => {
    return (
        <Link to={"/"} style={{color: "black"}}>
            <img alt={"logo"} src={logo} className={styles.appLogo}/>
            <div className={styles.appName}>{appName}</div>
        </Link>
    )
}

export default Logo;