import {Avatar, Card, Chip, Stack, Typography} from "@mui/material";


const ParticipantTile = (props) => {


    return (
        <>
            <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
                <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                    <Avatar variant="rounded" src="avatar.jpg" />
                    <Typography variant="body2" color="text.secondary">
                        {props.login}
                    </Typography>
                    {
                        props.owner &&
                        <Chip
                            size="small"
                            color="primary"
                            label="OWNER"
                        />
                    }
                </Stack>
            </Card>
        </>
    )
}

export default ParticipantTile;