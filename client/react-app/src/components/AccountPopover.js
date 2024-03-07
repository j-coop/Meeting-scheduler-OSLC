import {Button, ButtonGroup, Popover, Typography} from "@mui/material";
import UserCard from "./UserCard";
import {useAuth} from "../context/AuthContext";
import {Link} from "react-router-dom";


const AccountPopover = (props) => {

    const {userLogin, userEmail, userName, logout} = useAuth();

    return (
        <Popover
            id={props.id}
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <UserCard
                login={userLogin}
                email={userEmail}
                name={userName}
                addPresent={false}
            />
            <div
                style={{
                    paddingLeft: "10px",
                    paddingRight: "10px"
                }}
            >
                <Typography>Username: {userLogin}</Typography>
                <Typography>Email: {userEmail}</Typography>
                <ButtonGroup
                    orientation="vertical"
                    aria-label="Vertical button group"
                    fullWidth={true}
                    variant="text"
                >
                    <Link to={"/account"} onClick={props.handleClose}><Button>Account</Button></Link>
                    <Link to={"/meetings"} onClick={props.handleClose}><Button>Meetings</Button></Link>
                    <Link to={"/users"} onClick={props.handleClose}><Button>Users</Button></Link>
                    <Link to={"/settings"} onClick={props.handleClose}><Button>Settings</Button></Link>
                    <Button onClick={logout}>Logout</Button>
                </ButtonGroup>
            </div>
        </Popover>
    )
}

export default AccountPopover;