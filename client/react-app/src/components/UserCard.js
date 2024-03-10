import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useAuth} from "../context/AuthContext";


const UserCard = (props) => {

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
            <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                <Avatar variant="rounded" src="avatar.jpg" />
                <div>
                    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                        <Typography fontWeight="semiBold">{name}</Typography>
                        <Chip
                            size="small"
                            color={active ? 'secondary' : 'default'}
                            label={login}
                        />
                    </Stack>
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
        </Card>
    )
}

export default UserCard;