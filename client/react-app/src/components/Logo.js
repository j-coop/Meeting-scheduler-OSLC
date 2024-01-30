import logo from "../resources/logo.png";
import styles from "../styles/nav.module.css";

const appName = "MeetIT";

const Logo = () => {
    return (
        <>
            <img alt={"logo"} src={logo} className={styles.appLogo}/>
            <div className={styles.appName}>{appName}</div>
        </>
    )
}

export default Logo;