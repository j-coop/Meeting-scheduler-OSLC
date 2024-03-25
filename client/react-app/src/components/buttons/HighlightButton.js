import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import React, {useEffect, useRef, useState} from "react";
import AccountPopover from "../navbar/AccountPopover";
import {Button, Typography} from "@mui/material";


const HighlightButton = (props) => {
    const {isLoggedIn} = useAuth();

    //const [open, setOpen] = useState(false);

    const {open,setOpen} = useAuth();

    //const [anchorEl, setAnchorEl] = useState(null);
    const anchorEl = useRef();

    const setRef = (element) => {
        anchorEl.current = element; // Assign the element to the ref
    };

    useEffect(() => {
        console.log("rerender")
    }, []);

    useEffect(() => {
        console.log(open)
        //setOpen(true);
    }, [open]);

    const handleClick = () => {
        //console.log(event.currentTarget)
        //setAnchorEl(event.currentTarget);
        setOpen(true);
        console.log("setting to true")
    };

    const handleClose = () => {
        setOpen(false);
        //setAnchorEl(null);
    };

    //const open = Boolean(anchorEl);
    const id = open ? 'popover-account' : undefined;


    return (
        <div>
            <Link to={isLoggedIn ? null : "/signup"}>
                <Button
                    id="popover-account"
                    ref={setRef}
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
                anchorEl={() => anchorEl.current}
                //anchorEl={anchorEl}
            />
        </div>
    )
}

export default HighlightButton;