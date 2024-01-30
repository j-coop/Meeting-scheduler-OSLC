import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import {AuthProvider} from "../context/AuthContext";

const Layout = () => {
    return (
        <AuthProvider>
            <>
                <NavBar/>
                <Outlet />
            </>
        </AuthProvider>
    )
};

export default Layout;