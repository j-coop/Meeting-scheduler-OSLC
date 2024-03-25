import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";


const ConfirmPassword = ({open, onClose, onConfirmation, reset}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const {userPassword} = useAuth();

    const checkCurrentPassword = (providedPassword) => {
        return providedPassword === userPassword;
    }

    const checkPasswordsEqual = () => {
        if (password === confirmPassword) {
            if (reset) {
                if (checkCurrentPassword(oldPassword)) {
                    onConfirmation(password);
                    onClose();
                }
                else {
                    alert("Wrong credentials!")
                    setOldPassword("");
                }
            }
            else {
                onConfirmation();
                onClose();
            }
        }
        else {
            alert("Passwords don't match. Try again!")
            setPassword("");
            setConfirmPassword("");
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="confirm-password-dialog">
                <DialogTitle id="confirm-password-dialog">
                    {
                        reset ? "Reset password" : "Confirm password"
                    }
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {
                        reset &&
                        <TextField
                            label="Old password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={checkPasswordsEqual} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmPassword;