import {Avatar, Card, Chip, Fab, Stack, Switch, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const UserCard = (props) => {

    const active = true;

    return (
        <Card sx={{ p: 2.5 }}>
            <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                <Avatar variant="rounded" src="avatar.jpg" />
                <div>
                    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                        <Typography fontWeight="semiBold">{props.name}</Typography>
                        <Chip
                            size="small"
                            color={active ? 'success' : 'default'}
                            label={props.login}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {props.email}
                    </Typography>
                </div>
                <Switch sx={{ ml: 'auto' }} />
                <Fab disabled color="neutral" aria-label="add">
                    <AddIcon />
                </Fab>
            </Stack>
        </Card>
    )
}

export default UserCard;