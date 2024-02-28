import {createContext, useContext, useState} from "react";


const MeetingContext = createContext();

export const MeetingContextProvider = ({children}) => {

    const [status, setStatus] = useState("PROPOSED");
    const [color, setColor] = useState("default");
    const [label, setLabel] = useState("Proposed");

    return (
        <MeetingContext.Provider value={{status, setStatus, color, setColor, label, setLabel}}>
            {children}
        </MeetingContext.Provider>
    )
}

export const useMeetingContext = () => {
    return useContext(MeetingContext);
};