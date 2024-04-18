import styles from "../../styles/navButtons.module.css"
import {useAuth} from "../../context/AuthContext";
import HighlightButton from "../buttons/HighlightButton";
import React, {useEffect, useState} from "react";
import SignInPopup from "./SignInPopup";
import {FormControlLabel, Stack} from "@mui/material";
import ModeSwitch from "../buttons/ModeSwitch";
import {useColorMode} from "../../context/ColorModeContext";
import LogInOutButton from "../buttons/LogInOutButton";
import CreateMeetingButton from "../buttons/CreateMeetingButton";


const NavButtons = ({vertical, onClick}) => {
    const {isLoggedIn, login} = useAuth();

    const colorMode = useColorMode();

    const handleModeChange = () => {
        colorMode.toggleColorMode();
    };

    const verticalStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        marginTop: '10px'
    };

    const horizontalStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    };

    const LoggedInterface = ({popupPresent}) => {
        const {userLogin} = useAuth();
        return (
            <div style={vertical === true ? verticalStyle : horizontalStyle}>
                <LogInOutButton logged={true}/>
                {
                    (popupPresent === undefined || popupPresent) &&
                    <div style={vertical === true ? {marginTop: '10px'} : {}}>
                        <HighlightButton value={userLogin}/>
                    </div>
                }
            </div>
        )
    }

    const NotLoggedInterface = ({popupPresent}) => {

        const [signInOpen, setSignInOpen] = useState(false);

        const handleSignInClose = () => {
            setSignInOpen(false);
        };

        return (
            <div style={vertical === true ? verticalStyle : horizontalStyle}>
                <LogInOutButton logged={false} signIn={signInOpen} setSignIn={setSignInOpen}/>
                <SignInPopup open={signInOpen} onClose={handleSignInClose}/>
                {
                    (popupPresent === undefined || popupPresent) &&
                    <div style={vertical === true ? {marginTop: '10px'} : {}}>
                        <HighlightButton value="Sign up"/>
                    </div>
                }
            </div>
        )
    }

    useEffect(() => {
        // Check if a valid login token exists in localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            let parsedData = JSON.parse(userData);
            login(token, parsedData.login, parsedData);
        }
    }, []);

    return (
        (vertical !== undefined && vertical === true) ?
            <div className={styles.drawerButtons}>
                    <FormControlLabel
                        control={<ModeSwitch sx={{m: 1}} onClick={handleModeChange}/>}
                        label=""
                    />
                    {isLoggedIn ?
                        <LoggedInterface popupPresent={false}/> :
                        <NotLoggedInterface popupPresent={false}/>
                    }
                    <CreateMeetingButton vertical={true} onClick={onClick}/>
            </div>
            :
            <div className={styles.navButtons}>
                <FormControlLabel
                    control={<ModeSwitch sx={{m: 1}} onClick={handleModeChange}/>}
                    label=""
                />
                {isLoggedIn ? <LoggedInterface/> : <NotLoggedInterface/>}
                <CreateMeetingButton vertical={false}/>
            </div>
    )
}

export default NavButtons;