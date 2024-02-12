import styles from "../styles/navButtons.module.css"
import {useAuth} from "../context/AuthContext";
import HighlightButton from "./HighlightButton";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import SignInPopup from "./SignInPopup";
import {FormControlLabel} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import {useColorMode} from "../context/ColorModeContext";


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

    const colorMode = useColorMode();

    const handleModeChange = () => {
        colorMode.toggleColorMode();
    };

    useEffect(() => {
        // Check if a valid login token exists in localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            let parsedData= JSON.parse(userData);
            login(token, parsedData.login, parsedData);
        }
    }, []);

    return (
        <div className={styles.navButtons}>
            <FormControlLabel
                control={<ModeSwitch sx={{ m: 1 }} onClick={handleModeChange}/>}
                label=""
            />
            {isLoggedIn ? <LoggedInterface/> : <NotLoggedInterface/>}
            <CreateMeetingButton/>
        </div>
    )
}

export default NavButtons;