import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import MeetingPanel from "./MeetingPanel";
import {useAuth} from "../../context/AuthContext";


const MeetingCard = (props) => {

    const meetingData = props.meetingData;

    const [open, setOpen] = useState(false);

    const {userId} = useAuth();

    const switchOpen = () => {
        if (open) {
            // close
            setOpen(false);
        }
        else {
            // open
            setOpen(true);
        }
    }

    let color;
    let label;
    switch (meetingData.status) {
        case "PROPOSED":
            color = "default";
            label = "Proposed"
            break;
        case "SCHEDULED":
            color = "success";
            label = "Scheduled"
            break;
        case "COMPLETED":
            color = "success";
            label = "Completed"
            break;
        case "CANCELLED":
            color = "error";
            label = "Cancelled"
            break;
    }

    return (
        <Card
            sx={{
                p: 2.5,
                cursor: "pointer"
            }}
            onClick={switchOpen}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                useFlexGap
                justifyContent="space-between" // makes icon stick to the right
            >
                <div>
                    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                        <Typography fontWeight="semiBold">{meetingData.title}</Typography>
                        <Chip
                            size="small"
                            color={color}
                            label={label}
                        />
                        {
                            userId === meetingData.organiser &&
                            <Chip
                                size="small"
                                color="primary"
                                label="OWNER"
                            />
                        }
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {meetingData.description}
                    </Typography>
                </div>
                <div>
                    {
                        open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                    }
                </div>
            </Stack>
            {
                open ? <MeetingPanel meetingData={meetingData}/> : <></>
            }
        </Card>
    )
}

export default MeetingCard;