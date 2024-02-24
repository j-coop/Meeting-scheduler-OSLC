import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const ParticipantTile = (props) => {


    return (
        <>
            <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
                <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                    <Avatar variant="rounded" src="avatar.jpg" />
                    <Typography variant="body2" color="text.secondary">
                        {props.login}
                    </Typography>
                </Stack>
            </Card>
        </>
    )
}

export default ParticipantTile;