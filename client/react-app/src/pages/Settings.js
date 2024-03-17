import styles from '../styles/settings.module.css'
import UserCard from "../components/UserCard";
import {useAuth} from "../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import {Fab, Stack, Typography} from "@mui/material";
import {useState} from "react";
import ChangePanel from "../components/settings/ChangePanel";
import TimeZonePicker from "../components/TimeZonePicker";


const Settings = () => {

    const {userLogin, userEmail, userName} = useAuth();

    const [login, setLogin] = useState(userLogin);
    const [email, setEmail] = useState(userEmail);
    const [name, setName] = useState(userName);

    const [nameWindowOpen, setNameWindowOpen] = useState(false);
    const [emailWindowOpen, setEmailWindowOpen] = useState(false);
    const [loginWindowOpen, setLoginWindowOpen] = useState(false);

    const handleNameChange = () => {
        setNameWindowOpen(!nameWindowOpen);
    }

    const handleEmailChange = () => {
        setEmailWindowOpen(!emailWindowOpen);
    }

    const handleLoginChange = () => {
        setLoginWindowOpen(!loginWindowOpen);
    }

    const handlePasswordChange = () => {
        alert("password to be changed")
    }

    const iconSx = {
        color: 'text.primary',
        marginLeft: '10px',
        cursor: 'pointer'
    }

    return (
        <div className={styles.container}>
            <div className={styles.infoCard}>
                <UserCard />
            </div>
            <div className={styles.infoContent}>
                <Stack direction="row" alignItems="center" flexGap={1}>
                    <Typography variant="body1" color="text.primary">
                        Name: {name}
                    </Typography>
                    <EditIcon
                        sx={iconSx}
                        onClick={handleNameChange}
                    />
                </Stack>
                {
                    nameWindowOpen &&
                    <ChangePanel valueType="name"/>
                }
                <br/>
                <Stack direction="row" alignItems="center" flexGap={1}>
                    <Typography variant="body1" color="text.primary">
                        Email: {email}
                    </Typography>
                    <EditIcon
                        sx={iconSx}
                        onClick={handleEmailChange}
                    />
                </Stack>
                {
                    emailWindowOpen &&
                    <ChangePanel valueType="email"/>
                }
                <br/>
                <Stack direction="row" alignItems="center" flexGap={1}>
                    <Typography variant="body1" color="text.primary">
                        Login: {login}
                    </Typography>
                    <EditIcon
                        sx={iconSx}
                        onClick={handleLoginChange}
                    />
                </Stack>
                {
                    loginWindowOpen &&
                    <ChangePanel valueType="login"/>
                }
            </div>
            <div className={styles.accountSettings}>
                <hr/>
                <TimeZonePicker/>
            </div>
            <div className={styles.settingsButtons}>
                <Fab variant="extended" size="small" color="primary" onClick={handlePasswordChange}>
                    <EditIcon sx={{ color: 'text.primary', marginLeft: '10px', mr: 1 }} />
                    <Typography variant="body1" color="text.primary">
                        Reset password
                    </Typography>
                </Fab>
            </div>
        </div>
    )
};

export default Settings;