import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";


const ConfirmPassword = ({open, onClose, onConfirmation}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkConfirmation = () => {
        if (password === confirmPassword) {
            onConfirmation();
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
                <DialogTitle id="confirm-password-dialog">Confirm password</DialogTitle>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={checkConfirmation} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmPassword;