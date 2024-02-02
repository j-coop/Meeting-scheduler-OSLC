import {Button, ButtonGroup, TextField} from "@mui/material";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";


const CreateMeeting = () => {

    let alignment;

    function handleChange() {

    }

    return (
        <>
            <label>
                Title:
                <TextField id="standard-basic" label="Title" variant="standard" />
            </label>
            <label>
                Description:
                <input type={"text"}/>
            </label>
            <label>
                Duration:
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button>15 min</Button>
                    <Button>30 min</Button>
                    <Button>60 min</Button>
                    <Button>120 min</Button>
                    <Button>Custom</Button>
                </ButtonGroup>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="web">Web</ToggleButton>
                    <ToggleButton value="android">Android</ToggleButton>
                    <ToggleButton value="ios">iOS</ToggleButton>
                </ToggleButtonGroup>
            </label>
            <h2>Participants: </h2>
            <br/>
            <br/>

        </>
    )
}

export default CreateMeeting;