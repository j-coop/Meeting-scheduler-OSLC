import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import moment from 'moment-timezone';
import {useAuth} from "../context/AuthContext";

const TimeZonePicker = ({ timezone, setTimezone }) => {

    const {userTimezone} = useAuth();
    const userTimezoneObject = userTimezone ? {
        label: userTimezone,
        offset: `(GMT${moment.tz(userTimezone).format('Z')}) ${userTimezone}`,
    } : null;

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

    const [selectedTimeZone, setSelectedTimeZone] = useState(userTimezoneObject);

    const handleTimeZoneChange = (event, value) => {
        setSelectedTimeZone(value);
        if (setTimezone && value) {
            setTimezone(value.label);
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
