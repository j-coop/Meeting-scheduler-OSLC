import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import {AuthProvider} from "../context/AuthContext";
import React from 'react'
import {ColorModeProvider} from "../context/ColorModeContext";
import Footer from "../components/Footer";


const Layout = () => {

    return (
        <ColorModeProvider>
            <AuthProvider>
                <>
                    <NavBar/>
                    <Outlet/>
                    <Footer/>
                </>
            </AuthProvider>
        </ColorModeProvider>
    )
};

export default Layout;