import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";


const UserCard = (props) => {

    const active = true;

    const addPresent = props.addPresent;

    const [added, setAdded] = useState(false);

    const addUser = () => {
        setAdded(true);
        let userData = {
            id: props.id,
            login: props.login,
            email: props.email,
            name: props.name
        }
        props.setChosen([...props.chosen, userData]);
    }

    return (
        <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
            <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                <Avatar variant="rounded" src="avatar.jpg" />
                <div>
                    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                        <Typography fontWeight="semiBold">{props.name}</Typography>
                        <Chip
                            size="small"
                            color={active ? 'secondary' : 'default'}
                            label={props.login}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {props.email}
                    </Typography>
                </div>
                {
                    addPresent ?
                        <Fab
                            disabled={added}
                            color="neutral"
                            aria-label="add"
                            size="medium"
                            onClick={addUser}
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