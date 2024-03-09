import styles from '../styles/settings.module.css'
import StandardButton from "./StandardButton";
import {Stack, TextField} from "@mui/material";

const ChangePanel = ({valueType}) => {


    return (
        <div className={styles.changePanelContainer}>
            <Stack direction="column" alignItems="center">
                <TextField
                    id="outlined-basic"
                    label={`New ${valueType}`}
                    variant="outlined"
                    sx={{
                        marginTop: '10px'
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label={`Confirm new ${valueType}`}
                    variant="outlined"
                    sx={{
                        marginTop: '10px'
                    }}
                />
                <div style={{ margin: '10px' }}>
                    <StandardButton text="Confirm"/>
                </div>
            </Stack>
        </div>
    )
}

export default ChangePanel;