import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import moment from 'moment-timezone';
import {useAuth} from "../context/AuthContext";

const TimeZonePicker = ({ onChange }) => {

    const {userTimezone} = useAuth();

    const [timeZones, setTimeZones] = useState([]);

    useEffect(() => {
        // Fetch all time zones using moment-timezone
        const fetchTimeZones = () => {
            const timeZones = moment.tz.names().map((zone) => ({
                label: zone,
                offset: `(GMT${moment.tz(zone).format('Z')}) ${zone}`,
            }));
            setTimeZones(timeZones);
        };

        fetchTimeZones();
    }, []);

    const [selectedTimeZone, setSelectedTimeZone] = useState(null);

    const handleTimeZoneChange = (event, value) => {
        setSelectedTimeZone(value);
        if (onChange) {
            onChange(value);
        }
    };

    const isOptionEqualToValue = (option, value) => {
        if (option.label.toLowerCase().includes(value.toLowerCase())) {
            setSelectedTimeZone(value);
            return true;
        }
        return false;
    };

    return (
        <Autocomplete
            value={selectedTimeZone}
            onChange={handleTimeZoneChange}
            options={timeZones}
            getOptionLabel={(option) => option.offset}
            renderInput={(params) => (
                <TextField {...params} label="Time Zone" variant="outlined" />
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    <Typography variant="body2">{option.offset}</Typography>
                </li>
            )}

        />
    );
};

export default TimeZonePicker;
