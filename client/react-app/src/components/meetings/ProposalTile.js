import {Card, Chip, Stack, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {formatDuration} from "../../utils/FormatDate";
import StandardButton from "../buttons/StandardButton";
import ResponsesPanel from "./ResponsesPanel";
import config from "../../config";
import {useMeetingContext} from "../../context/MeetingContext";
import styles from "../../styles/proposalTile.module.css"

const ProposalTile = (props) => {

    let proposalData = props.proposalData;

    let startString = proposalData.startTime;
    let endString = proposalData.endTime;
    let proposalId = proposalData.id;

    let meetingData = props.meetingData;

    let durationString = formatDuration(startString, endString);

    let isOwner = props.owner;

    const {status, setStatus, chosen, setChosen} = useMeetingContext();

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
                    setChosen(proposalId);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    let isChosen = chosen === proposalData.id;

    return (
        <div>
            <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
                <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                    <div className={styles.container}>
                        <div className={styles.date}>
                            <AccessTimeIcon/>
                            <Typography variant="body2" color="text.secondary">
                                <span
                                    style={{
                                        textDecoration: (!isChosen && status !== "PROPOSED") ?
                                            'line-through red' : 'none'
                                    }}
                                >
                                    {durationString}
                                </span>
                            </Typography>
                        </div>
                        <div className={styles.status}>
                            <div className={styles.reactions}>
                                <ResponsesPanel meetingData={meetingData} proposalId={proposalId}/>
                            </div>
                            <div className={styles.statusGroup}>
                                {
                                    isOwner && status === "PROPOSED" &&
                                    <StandardButton
                                        text="Schedule"
                                        color="primary"
                                        handleClick={handleSchedule}
                                    />
                                }
                                {
                                    isChosen && status !== "PROPOSED" &&
                                    <Chip
                                        size="medium"
                                        color="secondary"
                                        label="CHOSEN"
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </Stack>
            </Card>
        </div>
    )
}


export default ProposalTile;