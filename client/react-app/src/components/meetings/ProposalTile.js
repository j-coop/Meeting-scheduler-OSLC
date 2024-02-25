import {Avatar, Card, Chip, Stack, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {formatISO8601} from "../../utils/FormatDate";

const ProposalTile = (props) => {

    let proposalData = props.proposalData;

    let startTime = formatISO8601(proposalData.startTime);
    let endTime = formatISO8601(proposalData.endTime);

    return (
        <div>
            <Card sx={{ p: 2.5, width: (props.width ? props.width : "100%") }}>
                <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
                    <AccessTimeIcon/>
                    <Typography variant="body2" color="text.secondary">
                        {startTime+" - "+endTime}
                    </Typography>
                </Stack>
            </Card>
        </div>
    )
}


export default ProposalTile;