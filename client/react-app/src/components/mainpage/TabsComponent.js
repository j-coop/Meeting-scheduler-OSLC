import {Box, Tab} from "@mui/material";
import {useState} from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from '../../styles/home.module.css'

const TabsComponent = () => {

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabsColors = ['blue', 'red', 'green'];

    return (
        <div className={styles.tabsContainer}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        sx={{
                            '& .MuiTab-root': {
                                '&.Mui-selected': {
                                    '& .MuiTab-indicator': {
                                        backgroundColor: tabsColors[value]
                                    },
                                },
                            },
                        }}
                        indicatorColor={tabsColors[value-1]}
                    >
                        <Tab label="Item One" value="1" sx={
                            {
                                backgroundColor: 'background.paper',
                                '&.Mui-selected':
                                    {
                                        backgroundColor: 'blue',
                                        color: "white"
                                    },
                                '.PrivateTabIndicator-root':
                                    {
                                        backgroundColor: 'blue',
                                    },
                            }
                        }/>
                        <Tab label="Item Two" value="2" sx={
                            {
                                backgroundColor: 'background.paper',
                                '&.Mui-selected':
                                    {
                                        backgroundColor: 'red',
                                        color: "white"
                                    },
                                '.PrivateTabIndicator-root':
                                    {
                                        backgroundColor: 'red',
                                    },
                            }
                        }/>
                        <Tab label="Item Three" value="3" sx={
                            {
                                backgroundColor: 'background.paper',
                                '&.Mui-selected':
                                    {
                                        backgroundColor: 'green',
                                        color: "white"
                                    },
                                '.PrivateTabIndicator-root':
                                    {
                                        backgroundColor: 'green',
                                    },
                            }
                        }/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    Item One <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida est pharetra, ultricies massa
                    sed, consectetur ipsum. Nunc enim augue, scelerisque vel lectus quis, facilisis pharetra libero.
                    Donec dolor mauris, gravida vitae tortor non, euismod tincidunt neque. Praesent accumsan, ligula
                    eget ultrices euismod, tortor libero ultricies ligula, in porta nulla orci at neque. Vivamus
                    ullamcorper posuere orci quis luctus. Cras purus tortor, sollicitudin vitae urna nec, convallis
                    malesuada nisl. Vivamus gravida turpis sed mauris pretium ullamcorper. Etiam pharetra ipsum nunc, a
                    luctus nibh rutrum vitae. Sed elementum nulla ac velit euismod ornare. In at tincidunt metus, at
                    dapibus eros.
                </TabPanel>
                <TabPanel value="2">
                    Item Two <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida est pharetra, ultricies massa
                    sed, consectetur ipsum. Nunc enim augue, scelerisque vel lectus quis, facilisis pharetra libero.
                    Donec dolor mauris, gravida vitae tortor non, euismod tincidunt neque. Praesent accumsan, ligula
                    eget ultrices euismod, tortor libero ultricies ligula, in porta nulla orci at neque. Vivamus
                    ullamcorper posuere orci quis luctus. Cras purus tortor, sollicitudin vitae urna nec, convallis
                    malesuada nisl. Vivamus gravida turpis sed mauris pretium ullamcorper. Etiam pharetra ipsum nunc, a
                    luctus nibh rutrum vitae. Sed elementum nulla ac velit euismod ornare. In at tincidunt metus, at
                    dapibus eros.
                </TabPanel>
                <TabPanel value="3">
                    Item Three <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida est pharetra, ultricies massa
                    sed, consectetur ipsum. Nunc enim augue, scelerisque vel lectus quis, facilisis pharetra libero.
                    Donec dolor mauris, gravida vitae tortor non, euismod tincidunt neque. Praesent accumsan, ligula
                    eget ultrices euismod, tortor libero ultricies ligula, in porta nulla orci at neque. Vivamus
                    ullamcorper posuere orci quis luctus. Cras purus tortor, sollicitudin vitae urna nec, convallis
                    malesuada nisl. Vivamus gravida turpis sed mauris pretium ullamcorper. Etiam pharetra ipsum nunc, a
                    luctus nibh rutrum vitae. Sed elementum nulla ac velit euismod ornare. In at tincidunt metus, at
                    dapibus eros.
                </TabPanel>
            </TabContext>
        </div>
    );
};

export default TabsComponent;
