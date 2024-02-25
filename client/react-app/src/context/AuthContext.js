import {createContext, useContext, useState} from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

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
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, userLogin, userEmail, userName, userId, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

