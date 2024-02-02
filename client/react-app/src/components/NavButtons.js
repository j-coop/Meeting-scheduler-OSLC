import styles from "../styles/navButtons.module.css"
import {useAuth} from "../context/AuthContext";
import HighlightButton from "./HighlightButton";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import SignInPopup from "./SignInPopup";


function LoggedInterface() {
    const {userLogin, logout} = useAuth();
    return (
        <>
            <button className={styles.plainButton} onClick={logout}>Log out</button>
            <HighlightButton value={userLogin}/>
        </>
    )
}

function NotLoggedInterface() {

    const [signInOpen, setSignInOpen] = useState(false);

    const handleSignInOpen = () => {
        setSignInOpen(true);
    };

    const handleSignInClose = () => {
        setSignInOpen(false);
    };

    return (
        <>
            <button
                className={styles.plainButton}
                onClick={signInOpen ? handleSignInClose : handleSignInOpen}
            >
                Log in
            </button>
            <SignInPopup open={signInOpen} onClose={handleSignInClose} />
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
    const {isLoggedIn, login} = useAuth();

    useEffect(() => {
        // Check if a valid login token exists in localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            login(token, userData);
        }
    }, []);

    return (
        <div className={styles.navButtons}>
            {isLoggedIn ? <LoggedInterface/> : <NotLoggedInterface/>}
            <CreateMeetingButton/>
        </div>
    )
}

export default NavButtons;