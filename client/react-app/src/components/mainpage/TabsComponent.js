import {Box, Tab} from "@mui/material";
import {useState} from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from '../../styles/home.module.css'
import tabsData from '../../texts/eng/tabs_text.json'

const TabsComponent = () => {

    const tab1Text = ""

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
                                        backgroundColor: tabsData.tabs[value - 1].color // Set the indicator color from JSON
                                    }
                                }
                            }
                        }}
                    >
                        {tabsData.tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.header}
                                value={(index + 1).toString()}
                                sx={{
                                    backgroundColor: 'background.paper',
                                    color: 'text.primary',
                                    borderRight: '1px solid',
                                    '&.Mui-selected': {
                                        backgroundColor: tab.color, // Set the tab background color from JSON
                                        color: 'white'
                                    },
                                    '.PrivateTabIndicator-root': {
                                        backgroundColor: tab.color // Set the tab indicator color from JSON
                                    }
                                }}
                            />
                        ))}
                    </TabList>
                </Box>
                {tabsData.tabs.map((tab, index) => (
                    <TabPanel key={index} value={(index + 1).toString()}>
                        <div className={styles.tabContainer}>
                            <div className={styles.tabText}>
                                {tab.text}
                            </div>
                            <div className={styles.tabImage}>

                            </div>
                        </div>
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    );
};

export default TabsComponent;
