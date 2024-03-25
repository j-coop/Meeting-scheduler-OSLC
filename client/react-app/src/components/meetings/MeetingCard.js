import {Card, Chip, Stack, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect, useState} from "react";
import MeetingPanel from "./MeetingPanel";
import {useAuth} from "../../context/AuthContext";
import {useMeetingContext} from "../../context/MeetingContext";
import axios from "axios";
import config from "../../config";


const MeetingCard = (props) => {

    const meetingData = props.meetingData;

    const meetingId = meetingData.id;

    const [open, setOpen] = useState(false);

    const {userId} = useAuth();

    const {status, setStatus, color, setColor, label, setLabel, setChosen} = useMeetingContext();

    const [participationStatus, setParticipationStatus] = useState("INVITED");
    const [userParticipationId, setUserParticipationId] = useState("");

    const fetchUserParticipation = async () => {
        let path = config.apiUrl+'/meetings/'+meetingId+'/participations';
        try {
            const response = await axios.get(path);
            const participationsList = response.data.participationsList || [];
            for (let participation of participationsList) {
                if (participation.userId === userId) {
                    // correct users participation
                    setParticipationStatus(participation.userStatus);
                    setUserParticipationId(participation.id);
                    console.log(participation.userStatus);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchUserParticipation().then();
    }, []);

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
        setChosen(meetingData.chosenProposal);

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
                        {
                            participationStatus === "JOINED" ?
                                <Chip
                                    size="small"
                                    color={color}
                                    label={label}
                                />
                                :
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label="INVITED"
                                />
                        }

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
                open ?
                    <MeetingPanel
                        meetingData={meetingData}
                        userStatus={participationStatus}
                        userParticipationId={userParticipationId}
                        setParticipationStatus={setParticipationStatus}
                    />
                    :
                    <></>
            }
        </Card>
    )
}

export default MeetingCard;