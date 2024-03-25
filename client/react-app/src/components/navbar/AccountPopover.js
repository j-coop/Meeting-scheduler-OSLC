import {Button, ButtonGroup, Popover, Typography} from "@mui/material";
import UserCard from "../UserCard";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";


const AccountPopover = ({id, open, handleClose, anchorEl}) => {

    const {userLogin, userEmail, logout} = useAuth();

    return (
        <Popover
            id={id}
            open={open}
            onLoad={()=>{console.log("load")}}
            anchorEl={anchorEl}
            onClose={handleClose}
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
                    <Link to={"/meetings"} onClick={handleClose}><Button>Meetings</Button></Link>
                    <Link to={"/users"} onClick={handleClose}><Button>Users</Button></Link>
                    <Link to={"/settings"} onClick={handleClose}><Button>Settings</Button></Link>
                    <Link to={"/about"} onClick={handleClose}><Button>About</Button></Link>
                    <Button onClick={logout}>Logout</Button>
                </ButtonGroup>
            </div>
        </Popover>
    )
}

export default AccountPopover;