import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Link} from "react-router-dom";


const UserCard = (props) => {

    const compact = props.compact !== undefined ? props.compact : false;

    const onClick = props.onClick !== undefined ? props.onClick : null;

    const active = true;

    const addPresent = props.addPresent;

    const [added, setAdded] = useState(false);

    const {userLogin, userEmail, userName} = useAuth();

    const userData = props.userData;

    const id = userData !== undefined ? userData.id : 0;
    const login = userData !== undefined ? userData.login : userLogin;
    const email = userData !== undefined ? userData.email : userEmail;
    const name = userData !== undefined ? userData.fullName : userName;

    const addUser = () => {
        setAdded(true);
        let userData = {
            id: id,
            login: login,
            email: email,
            fullName: name
        }
        props.setChosen([...props.chosen, userData]);
    }

    return (
        <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
            <Link to={onClick !== null ? "/settings" : null} onClick={onClick}>
                <Stack direction={compact ? "column" : "row"} alignItems="center" spacing={compact ? 1 : 2} useFlexGap>
                    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                        <Avatar variant="rounded" src="avatar.jpg" />
                        {
                            compact &&
                            <Stack direction="column" alignItems="center"  useFlexGap>
                                <Typography fontWeight="semiBold" color="text.primary">{name}</Typography>
                                <Chip
                                    size="small"
                                    color={active ? 'secondary' : 'default'}
                                    label={login}
                                />
                            </Stack>
                        }
                    </Stack>
                    <div>
                        {
                            !compact &&
                            <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                                <Typography fontWeight="semiBold" color="text.primary">{name}</Typography>
                                <Chip
                                    size="small"
                                    color={active ? 'secondary' : 'default'}
                                    label={login}
                                />
                            </Stack>
                        }
                        <Typography variant="body2" color="text.secondary">
                            {email}
                        </Typography>
                    </div>
                    {
                        addPresent ?
                            <Fab
                                disabled={added}
                                color="neutral"
                                aria-label="add"
                                size="medium"
                                onClick={props.setChosen !== null ? addUser : null}
                                style = {{
                                    float: "right"
                                }}
                            >
                                <AddIcon />
                            </Fab>
                            :<></>
                    }
                </Stack>
            </Link>
        </Card>
    )
}

export default UserCard;