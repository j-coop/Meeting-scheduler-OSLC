import {Button, Popover, Typography} from "@mui/material";
import UserCard from "./UserCard";
import {useAuth} from "../context/AuthContext";


const AccountPopover = (props) => {

    const {userLogin, userEmail, userName} = useAuth();

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
            <div>
                <Typography>Username: {userLogin}</Typography>
                <Typography>Email: {userEmail}</Typography>
                <Button>Settings</Button>
                <Button>Logout</Button>
            </div>
        </Popover>
    )
}

export default AccountPopover;