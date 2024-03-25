import {Button, Typography} from "@mui/material";
import React from "react";
import {useAuth} from "../../context/AuthContext";


const LogInOutButton = (props) => {

    const logged = props.logged;
    const signInOpen = props.signIn;
    const setSignInOpen = props.setSignIn;

    const {logout} = useAuth();

    const handleSignInOpen = () => {
        setSignInOpen(true);
    };

    const handleSignInClose = () => {
        setSignInOpen(false);
    };

    return (
        <Button
            onClick={logged ? logout : (signInOpen ? handleSignInClose : handleSignInOpen)}
            color="secondary"
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
                color="secondary"
                sx={{
                    textTransform: 'none',
                    letterSpacing: '1px'
                }}
            >
                {logged ? "Log out" : "Log in"}
            </Typography>
        </Button>
    )
}

export default LogInOutButton;