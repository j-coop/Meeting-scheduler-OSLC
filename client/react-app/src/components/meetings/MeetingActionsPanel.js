import StandardButton from "../StandardButton";


const MeetingActionsPanel = (props) => {

    let status = props.status;
    let isOwner = props.owner;

    const handleCancel = () => {

    }

    const handleCompleted = () => {

    }

    return (
        <div>
            {
                (isOwner && status === ("PROPOSED" || "SCHEDULED")) &&
                <StandardButton
                    text="Cancel"
                    color="error"
                    handleClick={handleCancel}
                />
            }
            {
                (isOwner && status === "SCHEDULED") &&
                <StandardButton
                    text="Mark completed"
                    color="primary"
                    handleClick={handleCompleted}
                />
            }
        </div>
    )
}

export default MeetingActionsPanel;