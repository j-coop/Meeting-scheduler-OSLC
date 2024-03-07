import UserSearch from "../components/UserSearch";
import React from "react";

const Users = () => {

    return (
        <>
            <UserSearch chosen={null} setChosen={null} maxResults={10} addPresent={false}/>
        </>
    )
};

export default Users;