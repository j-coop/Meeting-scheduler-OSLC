import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useAuth} from "../context/AuthContext";
import config from "../config";


const SignInPopup = ({ open, onClose }) => {
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const {login} = useAuth();

    const getUserData = async (login) => {
        try {
            const response = await fetch(config.apiUrl+'/users/login/'+login, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.log("User data error");
                return {};
            }
        } catch (error) {
            console.error('Error:', error);
            return {};
        }
    };

    const handleSignIn = async () => {

        fetch(config.apiUrl+'/users/login?login='+userLogin+'&password='+userPassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"login":userLogin, "password":userPassword})
        })
            .then(async response => {
                if (response.ok) {
                    alert("Logged in successfully");
                    let token = await response.json();
                    // get logged user's data
                    let data = await getUserData(userLogin);
                    console.log(data.email);
                    login(token, userLogin, data);
                } else {
                    alert("Wrong credentials");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="sign-in-dialog">
            <DialogTitle id="sign-in-dialog">Sign In</DialogTitle>
            <DialogContent>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userLogin}
                    onChange={(e) => setUserLogin(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSignIn} color="primary">
                    Sign In
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignInPopup;