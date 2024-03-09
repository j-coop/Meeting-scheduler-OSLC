import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import CreateMeeting from "./pages/CreateMeeting";
import Account from "./pages/Account";
import Meetings from "./pages/Meetings";
import Users from "./pages/Users";
import About from "./pages/About";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="create" element={<CreateMeeting/>}/>
                    <Route path="account" element={<Account/>}/>
                    <Route path="meetings" element={<Meetings/>}/>
                    <Route path="users" element={<Users/>}/>
                    <Route path="/about" element={<About/>}/>
                </Route>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
