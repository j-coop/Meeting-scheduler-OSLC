import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import {AuthProvider} from "../context/AuthContext";
import React from 'react'
import {ColorModeProvider} from "../context/ColorModeContext";


const Layout = () => {

    return (
        <ColorModeProvider>
            <AuthProvider>
                <>
                    <NavBar/>
                    <Outlet />
                </>
            </AuthProvider>
        </ColorModeProvider>
    )
};

export default Layout;