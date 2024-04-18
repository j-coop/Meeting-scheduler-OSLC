import logo from "../../resources/logo.png";
import styles from "../../styles/nav.module.css";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

const appName = "MeetIT";

const Logo = ({onClick}) => {
    return (
        <Link to={"/"} style={{color: "black"}} onClick={onClick !== undefined ? onClick : null}>
            <img alt={"logo"} src={logo} className={styles.appLogo}/>
            <div className={styles.appName}>
                <Typography variant="h4" color="textPrimary">{appName}</Typography>
            </div>
        </Link>
    )
}

export default Logo;