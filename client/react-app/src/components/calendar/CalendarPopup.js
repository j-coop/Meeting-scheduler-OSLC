import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import StandardButton from "../buttons/StandardButton";
import {formatDuration} from "../../utils/FormatDate";


const CalendarPopup = ({date, open, onClose, handleRemove}) => {

    const removeDate = () => {
        handleRemove(date);
        onClose();
    }

    const infoString = date ? formatDuration(date.start, date.end) : "";

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="date-details-dialog">
                <DialogTitle id="date-details-dialog">
                    Date proposal
                </DialogTitle>
                <DialogContent>
                    {infoString}
                </DialogContent>
                <DialogActions>
                    <StandardButton text="Remove" color="error" handleClick={removeDate}/>
                    <StandardButton text="Back" handleClick={onClose}/>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CalendarPopup;