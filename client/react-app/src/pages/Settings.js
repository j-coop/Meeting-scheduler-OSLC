import styles from '../styles/settings.module.css'
import UserCard from "../components/UserCard";
import {useAuth} from "../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import {Fab, Stack, Typography} from "@mui/material";
import {useState} from "react";
import ChangePanel from "../components/settings/ChangePanel";
import TimeZonePicker from "../components/TimeZonePicker";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ConfirmPassword from "../components/settings/ConfirmPassword";
import config from "../config";


const Settings = () => {

    const {userLogin, userEmail, userName, userId, userPassword} = useAuth();

    const [login, setLogin] = useState(userLogin);
    const [email, setEmail] = useState(userEmail);
    const [name, setName] = useState(userName);
    const [timezone, setTimezone] = useState();

    const [nameWindowOpen, setNameWindowOpen] = useState(false);
    const [emailWindowOpen, setEmailWindowOpen] = useState(false);
    const [loginWindowOpen, setLoginWindowOpen] = useState(false);

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handleConfirmClose = () => {
        setIsConfirmDialogOpen(false);
    }

    const handleCorfirmation = () => {

        const updateData = {
            login: login,
            fullName: name,
            email: email,
            timezone: "",
            password: "",
            currentPassword: userPassword
        }

        // send update user info request
        fetch(config.apiUrl+'/users/'+userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(async response => {
                if (response.ok) {
                    alert("User data changed successfully");
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const openConfirmDialog = () => {
        setIsConfirmDialogOpen(true);
    }

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
                <TimeZonePicker timezone={timezone} setTimezone={setTimezone}/>
            </div>
            <div className={styles.settingsButtons}>
                <Fab variant="extended" size="small" color="primary" onClick={handlePasswordChange}>
                    <EditIcon sx={{ color: 'text.primary', marginLeft: '10px', mr: 1 }} />
                    <Typography variant="body1" color="text.primary">
                        Reset password
                    </Typography>
                </Fab>
                <Fab variant="extended" size="small" color="secondary" onClick={openConfirmDialog}>
                    <DoneOutlineIcon sx={{ color: 'text.primary', marginLeft: '10px', mr: 1 }} />
                    <Typography variant="body1" color="text.primary">
                        Save
                    </Typography>
                </Fab>
            </div>
            <ConfirmPassword
                onClose={handleConfirmClose}
                open={isConfirmDialogOpen}
                onConfirmation={handleCorfirmation}
            />
        </div>
    )
};

export default Settings;