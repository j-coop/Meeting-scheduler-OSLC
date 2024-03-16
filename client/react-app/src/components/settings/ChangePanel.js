import styles from '../../styles/settings.module.css'
import StandardButton from "../buttons/StandardButton";
import {Stack, TextField} from "@mui/material";
import {useState} from "react";

const ChangePanel = ({valueType}) => {

    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");


    const changeLogin = () => {

    }

    const changeEmail = () => {

    }

    const changeName = () => {

    }


    const handleChange1 = (event) => {
        setValue1(event.target.value);
    };

    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };

    const handleConfirm = () => {
        if (value1 === value2) {
            // send change request to server
            switch (valueType) {
                case "login":
                    changeLogin();
                    break;
                case "email":
                    changeEmail();
                    break;
                case "name":
                    changeName();
                    break;
                default:
                    break;
            }
        }
        else {
            alert("Values must be identical!");
        }
    }

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
                    value={value1}
                    onChange={handleChange1}
                />
                <TextField
                    id="outlined-basic"
                    label={`Confirm new ${valueType}`}
                    variant="outlined"
                    sx={{
                        marginTop: '10px'
                    }}
                    value={value2}
                    onChange={handleChange2}
                />
                <div style={{ margin: '10px' }}>
                    <StandardButton text="Confirm" handleClick={handleConfirm}/>
                </div>
            </Stack>
        </div>
    )
}

export default ChangePanel;