import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [userTimezone, setUserTimezone] = useState(null);

    const navigate = useNavigate();

    const login = (token, login, data) => {
        localStorage.setItem('token', token);
        if (!localStorage.getItem('userData')) {
            localStorage.setItem('userData', JSON.stringify(data));
        }
        setLoggedIn(true);
        setUserLogin(login);
        setUserEmail(data.email);
        setUserName(data.fullName);
        setUserId(data.userId);
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
            userData,
            userTimezone,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

