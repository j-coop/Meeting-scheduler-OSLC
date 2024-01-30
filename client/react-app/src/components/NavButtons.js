import styles from "../styles/navButtons.module.css"
import {useAuth} from "../context/AuthContext";


function LoggedInterface() {
    const {isLoggedIn, login, logout} = useAuth();
    return (
        <>
            <button className={styles.plainButton} onClick={logout}>Log out</button>
            <button className={styles.highlightButton}>Account</button>
        </>
    )
}

function NotLoggedInterface() {
    const {isLoggedIn, login, logout} = useAuth();
    return (
        <>
            <button className={styles.plainButton} onClick={login}>Log in</button>
            <button className={styles.highlightButton}>Sign up</button>
        </>
    )
}

function CreateMeetingButton() {
    return (
        <button className={styles.createMeetingButton}>
            <span style={{fontWeight: "bold"}}>+</span> Create Meeting
        </button>
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