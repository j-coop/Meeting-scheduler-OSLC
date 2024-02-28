import {Card, Stack, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {formatDuration} from "../../utils/FormatDate";
import StandardButton from "../StandardButton";
import ResponsesPanel from "./ResponsesPanel";
import config from "../../config";
import {useState} from "react";
import {useMeetingContext} from "../../context/MeetingContext";

const ProposalTile = (props) => {

    let proposalData = props.proposalData;

    let startString = proposalData.startTime;
    let endString = proposalData.endTime;
    let proposalId = proposalData.id;

    let meetingData = props.meetingData;

    //let startTime = formatISO8601(startString);
    //let endTime = formatISO8601(endString);

    let durationString = formatDuration(startString, endString);

    let isOwner = props.owner;

    const {status, setStatus} = useMeetingContext();

    const handleSchedule = () => {

        let path = config.apiUrl+'/meetings/'+meetingData.id+'/schedule?proposalId='+proposalId;

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log("meeting scheduled");
                    meetingData.status = "SCHEDULED";
                    setStatus("SCHEDULED");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
                <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                    <AccessTimeIcon/>
                    <Typography variant="body2" color="text.secondary">
                        {durationString}
                    </Typography>
                    <ResponsesPanel />
                    {
                        isOwner && status === "PROPOSED" &&
                        <StandardButton
                            text="Schedule"
                            color="primary"
                            handleClick={handleSchedule}
                        />
                    }
                </Stack>
            </Card>
        </div>
    )
}


export default ProposalTile;