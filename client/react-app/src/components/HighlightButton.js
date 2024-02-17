import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import React from "react";
import AccountPopover from "./AccountPopover";
import {Button, Typography} from "@mui/material";


function HighlightButton(props) {
    const {isLoggedIn,} = useAuth();


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'popover-account' : undefined;


    return (
        <>
            <Link to={isLoggedIn ? null : "/signup"}>
                <Button
                    onClick={handleClick}
                    variant="contained"
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
                        color="textPrimary"
                        sx={{
                            textTransform: 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        {props.value}
                    </Typography>
                </Button>
            </Link>
            <AccountPopover
                id = {id}
                open = {open}
                handleClose = {handleClose}
                anchorEl = {anchorEl}
            />
        </>
    )
}

export default HighlightButton;