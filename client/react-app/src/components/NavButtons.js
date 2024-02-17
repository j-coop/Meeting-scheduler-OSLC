import styles from "../styles/navButtons.module.css"
import {useAuth} from "../context/AuthContext";
import HighlightButton from "./HighlightButton";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SignInPopup from "./SignInPopup";
import {Button, FormControlLabel, Typography} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import {useColorMode} from "../context/ColorModeContext";
import LogInOutButton from "./LogInOutButton";


function LoggedInterface() {
    const {userLogin, logout} = useAuth();
    return (
        <>
            <LogInOutButton logged={true}/>
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
            <LogInOutButton logged={false} signIn={signInOpen} setSignIn={setSignInOpen}/>
            <SignInPopup open={signInOpen} onClose={handleSignInClose} />
            <HighlightButton value="Sign up"/>
        </>
    )
}

function CreateMeetingButton() {
    return (
        <Link to={"/create"}>
            <Button
                variant="contained"
                color="primary"
                sx={{
                    borderRadius: "20px"
                }}
                style={{
                    marginTop: 0,
                    paddingLeft: "15px",
                    paddingRight: "15px"
                }}
            >
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{
                        textTransform: 'none',
                        letterSpacing: '1px'
                    }}
                >
                    <span style={{fontWeight: "bold"}}>+</span> Create Meeting
                </Typography>
            </Button>
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