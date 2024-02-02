import styles from "../styles/navButtons.module.css"
import {useAuth} from "../context/AuthContext";
import HighlightButton from "./HighlightButton";
import {Link} from "react-router-dom";


function LoggedInterface() {
    const {isLoggedIn, login, logout} = useAuth();
    return (
        <>
            <button className={styles.plainButton} onClick={logout}>Log out</button>
            <HighlightButton value="Account"/>
        </>
    )
}

function NotLoggedInterface() {
    const {isLoggedIn, login, logout} = useAuth();
    return (
        <>
            <button className={styles.plainButton} onClick={login}>Log in</button>
            <HighlightButton value="Sign up"/>
        </>
    )
}

function CreateMeetingButton() {
    return (
        <Link to={"/create"}>
            <button className={styles.createMeetingButton}>
                <span style={{fontWeight: "bold"}}>+</span> Create Meeting
            </button>
        </Link>
    )
}

const NavButtons = () => {
    const {isLoggedIn, login, logout} = useAuth();

    return (
        <div className={styles.navButtons}>
            {isLoggedIn ? <LoggedInterface/> : <NotLoggedInterface/>}
            <CreateMeetingButton/>
        </div>
    )
}

export default NavButtons;