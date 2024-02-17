import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


const MeetingCard = (props) => {


    return (
        <Card sx={{ p: 2.5 }}>
            <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                <div>
                    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                        <Typography fontWeight="semiBold">{props.title}</Typography>
                        <Chip
                            size="small"
                            color={props.status === 'proposed' ? 'success' : 'default'}
                            label={props.status === 'proposed' ? 'Proposed' : 'default'}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </div>
                <Fab disabled color="neutral" aria-label="add">
                    <AddIcon />
                </Fab>
            </Stack>
        </Card>
    )
}

export default MeetingCard;