import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import config from "../config";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userData, setUserData] = useState(null);
    const [userTimezone, setUserTimezone] = useState(null);
    //
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

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

    const login = (token, login, data) => {
        if (token) {
            localStorage.setItem('token', token);
        }
        if (!localStorage.getItem('userData')) {
            localStorage.setItem('userData', JSON.stringify(data));
        }
        setLoggedIn(true);
        setUserLogin(login);
        setUserEmail(data.email);
        setUserName(data.fullName);
        setUserId(data.userId);
        setUserPassword(data.password);
        setUserData(data);
        setUserTimezone(data.timezone);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setLoggedIn(false);
        setUserLogin(null);
        setUserEmail(null);
        setUserName(null);
        setUserId(null);
        setUserPassword(null);
        setUserData(null);
        setUserTimezone(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userLogin,
            userEmail,
            userName,
            userId,
            userPassword,
            userData,
            userTimezone,
            login,
            logout,
            getUserData,
            open, setOpen
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

