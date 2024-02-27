import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {Badge, IconButton, Tooltip} from "@mui/material";

const ResponsesPanel = () => {


    return (
        <div>
            <Tooltip title="Available">
                <IconButton>
                    <Badge badgeContent={"0"} color="secondary">
                        <CheckIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>

            <Tooltip title="If must">
                <IconButton>
                    <Badge badgeContent={"0"} color="secondary">
                        <PriorityHighIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>

            <Tooltip title="Unavailable">
                <IconButton>
                    <Badge badgeContent={"0"} color="secondary">
                        <CloseIcon/>
                    </Badge>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ResponsesPanel;