import {Avatar, Card, Chip, Fab, Stack, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import MeetingPanel from "./MeetingPanel";


const MeetingCard = (props) => {

    const [open, setOpen] = useState(false);

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
    switch (props.status) {
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
                        <Typography fontWeight="semiBold">{props.title}</Typography>
                        <Chip
                            size="small"
                            color={color}
                            label={label}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </div>
                <div>
                    {
                        open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                    }
                </div>
            </Stack>
            {
                open ? <MeetingPanel id={props.id}/> : <></>
            }
        </Card>
    )
}

export default MeetingCard;