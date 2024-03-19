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

    const {userLogin, userEmail, userName, userId, userPassword, getUserData, login, userTimezone} = useAuth();

    const [_login, set_login] = useState(userLogin);
    const [email, setEmail] = useState(userEmail);
    const [name, setName] = useState(userName);
    const [timezone, setTimezone] = useState(userTimezone);

    const [nameWindowOpen, setNameWindowOpen] = useState(false);
    const [emailWindowOpen, setEmailWindowOpen] = useState(false);
    const [loginWindowOpen, setLoginWindowOpen] = useState(false);

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

    const handleConfirmClose = () => {
        setIsConfirmDialogOpen(false);
    }

    const handleResetClose = () => {
        setIsResetDialogOpen(false);
    }

    const handleWindowsClose = (valueType) => {
        switch (valueType) {
            case "login":
                setLoginWindowOpen(false);
                break;
            case "email":
                setEmailWindowOpen(false);
                break;
            case "name":
                setNameWindowOpen(false);
                break;
            default:
                break;
        }
    }

    const handleCorfirmation = (newPassword) => {

        const updateData = {
            login: _login,
            fullName: name,
            email: email,
            timezone: timezone,
            password: newPassword !== undefined ? newPassword : userPassword,
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
                    if (newPassword) alert("Your password has been changed")
                    else alert("User data changed successfully");

                    const data = await getUserData(_login);
                    login(null, _login, data);
                } else {
                    alert("Error");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleResetConfirmation = (newPassword) => {
        handleCorfirmation(newPassword);
    }

    const openConfirmDialog = () => {
        setIsConfirmDialogOpen(true);
    }

    const openResetDialog = () => {
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
        setIsResetDialogOpen(true);
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
                    <Typography variant="body1" color={name === userName ? "text.primary" : "secondary"}>
                        Name: {name}
                    </Typography>
                    <EditIcon
                        sx={iconSx}
                        onClick={handleNameChange}
                    />
                </Stack>
                {
                    nameWindowOpen &&
                    <ChangePanel valueType="name" setName={setName} onConfirm={handleWindowsClose}/>
                }
                <br/>
                <Stack direction="row" alignItems="center" flexGap={1}>
                    <Typography variant="body1" color={email === userEmail ? "text.primary" : "secondary"}>
                        Email: {email}
                    </Typography>
                    <EditIcon
                        sx={iconSx}
                        onClick={handleEmailChange}
                    />
                </Stack>
                {
                    emailWindowOpen &&
                    <ChangePanel valueType="email" setEmail={setEmail} onConfirm={handleWindowsClose}/>
                }
                <br/>
                <Stack direction="row" alignItems="center" flexGap={1}>
                    <Typography variant="body1" color={_login === userLogin ? "text.primary" : "secondary"}>
                        Login: {_login}
                    </Typography>
                    <EditIcon
                        sx={iconSx}
                        onClick={handleLoginChange}
                    />
                </Stack>
                {
                    loginWindowOpen &&
                    <ChangePanel valueType="login" setLogin={set_login} onConfirm={handleWindowsClose}/>
                }
            </div>
            <div className={styles.accountSettings}>
                <hr/>
                <TimeZonePicker timezone={timezone} setTimezone={setTimezone}/>
            </div>
            <div className={styles.settingsButtons}>
                <div className={styles.passwordButton}>
                    <Fab variant="extended" size="small" color="primary" onClick={handlePasswordChange}>
                        <EditIcon sx={{ color: 'text.primary', marginLeft: '10px', mr: 1 }} />
                        <Typography variant="body1" color="text.primary">
                            Reset password
                        </Typography>
                    </Fab>
                </div>
                <div className={styles.saveButton}>
                    <Fab variant="extended" size="small" color="secondary" onClick={openConfirmDialog}>
                        <DoneOutlineIcon sx={{ color: 'text.primary', marginLeft: '10px', mr: 1 }} />
                        <Typography variant="body1" color="text.primary">
                            Save
                        </Typography>
                    </Fab>
                </div>
            </div>
            <ConfirmPassword
                onClose={handleConfirmClose}
                open={isConfirmDialogOpen}
                onConfirmation={handleCorfirmation}
                reset={false}
            />
            <ConfirmPassword
                onClose={handleResetClose}
                open={isResetDialogOpen}
                onConfirmation={handleResetConfirmation}
                reset={true}
            />
        </div>
    )
};

export default Settings;