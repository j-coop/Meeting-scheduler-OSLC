import styles from "../styles/navButtons.module.css"
import {useAuth} from "../context/AuthContext";
import HighlightButton from "./HighlightButton";
import React, {useEffect, useState} from "react";
import SignInPopup from "./SignInPopup";
import {FormControlLabel} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import {useColorMode} from "../context/ColorModeContext";
import LogInOutButton from "./LogInOutButton";
import CreateMeetingButton from "./CreateMeetingButton";


function LoggedInterface() {
    const {userLogin} = useAuth();
    return (
        <>
            <LogInOutButton logged={true}/>
            <HighlightButton value={userLogin}/>
        </>
    )
}

function NotLoggedInterface() {

    const [signInOpen, setSignInOpen] = useState(false);

    const handleSignInClose = () => {
        setSignInOpen(false);
    };

    return (
        <>
            <LogInOutButton logged={false} signIn={signInOpen} setSignIn={setSignInOpen}/>
            <SignInPopup open={signInOpen} onClose={handleSignInClose} />
            <HighlightButton value="Sign up"/>
        </>
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