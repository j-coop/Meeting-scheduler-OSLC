import {Card, Stack, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {formatDuration} from "../../utils/FormatDate";
import StandardButton from "../StandardButton";
import ResponsesPanel from "./ResponsesPanel";

const ProposalTile = (props) => {

    let proposalData = props.proposalData;

    let startString = proposalData.startTime;
    let endString = proposalData.endTime;
    let proposalId = proposalData.id;

    //let startTime = formatISO8601(startString);
    //let endTime = formatISO8601(endString);

    let durationString = formatDuration(startString, endString);

    let status = props.status;
    let isOwner = props.owner;

    const handleSchedule = () => {

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