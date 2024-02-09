import styles from "../styles/navButtons.module.css";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import React from "react";
import AccountPopover from "./AccountPopover";


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
                <button className={styles.highlightButton} onClick={handleClick}>
                    {props.value}
                </button>
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