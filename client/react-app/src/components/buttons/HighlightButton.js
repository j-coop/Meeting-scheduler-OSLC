import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import React, {useEffect, useState} from "react";
import AccountPopover from "../navbar/AccountPopover";
import {Button, Typography} from "@mui/material";


const HighlightButton = (props) => {
    const {isLoggedIn,} = useAuth();

    const [open, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    //const anchorEl = React.useRef();

    useEffect(() => {
        console.log(open)
    }, [open]);

    const handleClick = (event) => {
        //setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        //setOpen(false);
        setAnchorEl(null);
    };

    //const open = Boolean(anchorEl);
    const id = open ? 'popover-account' : undefined;


    return (
        <>
            <Link to={isLoggedIn ? null : "/signup"}>
                <Button
                    id="accountButton"
                    //ref={anchorEl}
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
                            letterSpacing: '1px',
                            fontSize: (props.size ? `${props.size}px` : '15px')
                        }}
                    >
                        {props.value}
                    </Typography>
                </Button>
            </Link>
            <AccountPopover
                id = 'popover-account'
                open = {open}
                handleClose = {handleClose}
                anchorEl={anchorEl}
            />
        </>
    )
}

export default HighlightButton;