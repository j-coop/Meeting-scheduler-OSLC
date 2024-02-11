import {createContext, useContext, useMemo, useState} from "react";
import {blue, green, grey} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material";


const ColorModeContext = createContext();

export const ColorModeProvider = ({children}) => {

    const getDesignTokens = (mode) => ({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    // palette values for light mode
                    primary: blue,
                    divider: blue[200],
                    text: {
                        primary: '#000',
                        secondary: blue[800],
                    },
                }
                : {
                    // palette values for dark mode
                    primary: green,
                    divider: green[700],
                    background: {
                        default: green[900],
                        paper: green[900],
                    },
                    text: {
                        primary: '#fff',
                        secondary: grey[500],
                    },
                }),
        },
    });


    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    // Update the theme only if the mode changes
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export const useColorMode = () => {
    return useContext(ColorModeContext);
};