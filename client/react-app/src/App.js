import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
