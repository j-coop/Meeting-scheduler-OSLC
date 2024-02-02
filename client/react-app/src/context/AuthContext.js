import {createContext, useContext, useState} from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userLogin, setUserLogin] = useState("");

    const login = (token, login) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userData', login)
        setLoggedIn(true);
        setUserLogin(login);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, userLogin, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};

