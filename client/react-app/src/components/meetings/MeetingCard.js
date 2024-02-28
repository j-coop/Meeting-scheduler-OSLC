import {Card, Chip, Stack, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useState} from "react";
import MeetingPanel from "./MeetingPanel";
import {useAuth} from "../../context/AuthContext";
import {MeetingContextProvider, useMeetingContext} from "../../context/MeetingContext";


const MeetingCard = (props) => {

    const meetingData = props.meetingData;

    const [open, setOpen] = useState(false);

    const {userId} = useAuth();

    const {status, setStatus, color, setColor, label, setLabel} = useMeetingContext();

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

    useEffect(() => {

        switch (status) {
            case "PROPOSED":
                setColor("default");
                setLabel("Proposed");
                break;
            case "SCHEDULED":
                setColor("success");
                setLabel("Scheduled");
                break;
            case "COMPLETED":
                setColor("success");
                setLabel("Completed");
                break;
            case "CANCELLED":
                setColor("error");
                setLabel("Canceled");
                break;
        }
    }, [status]);

    useEffect(() => {

        setStatus(meetingData.status);

        switch (meetingData.status) {
            case "PROPOSED":
                setColor("default");
                setLabel("Proposed");
                break;
            case "SCHEDULED":
                setColor("success");
                setLabel("Scheduled");
                break;
            case "COMPLETED":
                setColor("success");
                setLabel("Completed");
                break;
            case "CANCELLED":
                setColor("error");
                setLabel("Canceled");
                break;
        }
    }, []);


    return (
        <Card
            sx={{
                p: 2.5
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                useFlexGap
                justifyContent="space-between" // makes icon stick to the right
                onClick={switchOpen}
                sx={{
                    cursor: "pointer"
                }}
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